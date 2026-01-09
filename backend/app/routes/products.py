from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SesionLocal
from .. import models, schemas


# Router para las rutas de productos
# prefix="/products" Todas las rutas empiezan con /products
# tags Agrupación en Swagger
router = APIRouter(
    prefix="/products",
    tags=["Productos"]
)


# Dependencia para obtener la sesión de la base de datos
# Se encarga de abrir y cerrar la conexión automáticamente
def obtener_db():
    db = SesionLocal()
    try:
        yield db
    finally:
        db.close()


# Obtener todos los productos
@router.get("/", response_model=list[schemas.ProductoRespuesta])
def obtener_productos(db: Session = Depends(obtener_db)):
    # Consultar todos los productos de la base de datos
    productos = db.query(models.Producto).all()
    return productos


# Crear un nuevo producto
@router.post("/")
def crear_producto(producto: schemas.ProductoBase, db: Session = Depends(obtener_db)):
    # Crear una instancia del modelo Producto
    nuevo_producto = models.Producto(
        nombre=producto.nombre,
        precio=producto.precio
    )

    # Guardar el producto en la base de datos
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)

    # Retornar el producto creado
    return nuevo_producto
