import pydantic
from fastapi import APIRouter, UploadFile, File , HTTPException, Depends, status,Query
from pydantic import BaseModel
from app import usecases
from app.api import dependencies
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.core.auth import authenticate_user, create_access_token, get_current_user
from app.core.models import User
from passlib.context import CryptContext
from typing import Dict, Any, List
from app.usecases import DocumentService, RAGService,AuthService,FormSubmissionService
from app.api.dependencies import get_document_service, RAGServiceSingleton,FormServiceSingleton
from app.core.schemas import FormData,Submission
from app.configurations import Configs
from app.adapters.mongodb_adapter import MongoDBAdapter  # Importar MongoDBAdapter

mongodb_adapter = MongoDBAdapter()

configs = Configs()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

rag_router = APIRouter()

class DocumentInput(BaseModel):
    content: str = pydantic.Field(..., min_length=1)
class QueryInput(BaseModel):
    question: str = pydantic.Field(..., min_length=1)

@rag_router.post("/generate-answer/", status_code=200)
async def generate_answer(
    query_input: QueryInput,
    rag_service: usecases.RAGService = Depends(dependencies.RAGServiceSingleton.get_instance),
):
    return {"answer": rag_service.generate_answer(query_input.question)}

@rag_router.post("/save-document/", status_code=201)
def save_document(document: DocumentInput,
                  rag_service: usecases.RAGService = Depends(dependencies.RAGServiceSingleton.get_instance)):
    rag_service.save_document(content=document.content)
    return {"status": "Document saved successfully"}

@rag_router.post("/upload-file/", status_code=201)
async def upload_file(
    file: UploadFile = File(...),
    document_service: DocumentService = Depends(get_document_service),
    rag_service: RAGService = Depends(RAGServiceSingleton.get_instance)
):
    file_content = await file.read()
    extracted_text = document_service.extract_text(file_content)
    document_id = rag_service.save_document(extracted_text)
    return {"inserted_id": document_id}



@rag_router.delete("/delete-document/{document_id}", status_code=200)
async def delete_document(
    document_id: str,
    rag_service: RAGService = Depends(RAGServiceSingleton.get_instance)
):
    rag_service.delete_document(document_id)  # Usar RAGService para eliminar el documento
    return {"status": "Document deleted successfully"}


@rag_router.post("/token", response_model=dict)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(dependencies.AuthServiceSingleton.get_instance)
):
    access_token = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nombre de usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": access_token, "token_type": "bearer"}

@rag_router.post("/submit-form/", status_code=201, response_model=Dict[str, Any])
async def submit_form(
        form_data: FormData,
        form_service: FormSubmissionService = Depends(FormServiceSingleton.get_instance)
):
    success, message, data = await form_service.submit_form(form_data)

    if not success:
        raise HTTPException(status_code=400, detail=message)

    response_data = {
        "status": message,
        "inserted_id": data.get("inserted_id"),
        "email_sent": data.get("email_sent", False)
    }

    return response_data


@rag_router.get("/get-requests/", response_model=List[Submission], status_code=200)
async def get_requests(
    cedula: str = Query(None, description="Cédula para buscar"),
    current_user: User = Depends(get_current_user),
):
    try:
        # Filtrar por cédula si se proporciona
        if cedula:
            submissions_cursor = mongodb_adapter.db["form_submissions"].find({"cedula": cedula})
        else:
            submissions_cursor = mongodb_adapter.db["form_submissions"].find()
        
        submissions = []
        async for submission in submissions_cursor:
            submission_data = {
                "id": str(submission["_id"]),
                "nombre_completo": submission["nombre_completo"],
                "cedula": submission["cedula"],
                "convenio": submission["convenio"],
                "telefono": submission["telefono"],
                "fecha_nacimiento": submission["fecha_nacimiento"],
                "politica_privacidad": submission["politica_privacidad"],
                "created_at": submission.get("created_at"),
            }
            submissions.append(Submission(**submission_data))
        return submissions
    except Exception as e:
        print(f"Error al obtener las solicitudes: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener los datos.")