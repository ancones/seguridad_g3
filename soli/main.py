from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import queja_routes
from routes import solicitud_routes
from routes import index_routes
from middleware import verify_jwt

app = FastAPI()

# Configuración de CORS
origins = [
    "*",  # Permitir todas las fuentes (orígenes)
    # Si quieres permitir solo ciertos dominios, puedes especificarlos en lugar de "*":
    # "http://localhost",
    # "https://miapp.com",
    # "https://www.otrodominio.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite todos los orígenes o los que especifiques
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

app.include_router(
    queja_routes.router   
)
app.include_router(solicitud_routes.router)
app.include_router(index_routes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
