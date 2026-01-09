# Importación principal de FastAPI
from fastapi import FastAPI

# Middleware para permitir conexión desde el frontend (CORS)
from fastapi.middleware.cors import CORSMiddleware

# Base y motor de la base de datos
from .database import Base, motor

# Importamos los modelos para que SQLAlchemy los reconozca
from . import models

from .routes import products, cart


# Crear la aplicación FastAPI
app = FastAPI(
    title="Mini Ecommerce API",
    description="Backend para prueba técnica React + Python",
    version="1.0.0"
)


# Configuración de CORS
# Permite que el frontend en React se comunique con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Crear las tablas en la base de datos
# Se ejecuta al iniciar la aplicación
Base.metadata.create_all(bind=motor)


# Registrar las rutas del proyecto
app.include_router(products.router)
app.include_router(cart.router)


# Ruta raíz para verificar que la API está funcionando
@app.get("/")
def root():
    return {"message": "API Mini Ecommerce funcionando correctamente"}
