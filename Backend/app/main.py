# Backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers.rag_router import rag_router  # Importa la instancia de APIRouter

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Para desarrollo local
        "https://kredilibranza.netlify.app",  # URL de tu frontend en Netlify
        "https://kredilibranza.netlify.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir el router con el prefijo "/api"
app.include_router(rag_router, prefix="/api")

# Punto de entrada para desarrollo local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
