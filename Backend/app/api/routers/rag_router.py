# app/api/routers/rag_router.py

from fastapi import APIRouter

rag_router = APIRouter()

@rag_router.get("/endpoint")
async def get_endpoint():
    return {"message": "Success"}

# Puedes agregar más rutas según tus necesidades
@rag_router.post("/endpoint")
async def create_endpoint(data: dict):
    return {"received": data}
