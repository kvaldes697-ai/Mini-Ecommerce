from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SesionLocal
from .. import models, schemas


# Creamos el router para las rutas del carrito
# prefix = "/cart" todas las rutas comienzan con /cart
# tags Aparece agrupado en Swagger
router = APIRouter(
    prefix="/cart",
    tags=["Carrito"]
)


# Dependencia para obtener la sesión de la base de datos
# Se usa en cada endpoint para abrir y cerrar la conexión correctamente
def obtener_db():
    db = SesionLocal()
    try:
        yield db
    finally:
        db.close()


# Obtener todos los carritos guardados
@router.get("/", response_model=list[schemas.CarritoRespuesta])
def obtener_carritos(db: Session = Depends(obtener_db)):
    # Consultamos todos los carritos en la base de datos
    carritos = db.query(models.Carrito).all()
    return carritos


# Guardar un nuevo carrito
@router.post("/", response_model=schemas.CarritoRespuesta)
def guardar_carrito(carrito: schemas.CarritoCrear, db: Session = Depends(obtener_db)):

    # Validar que el carrito tenga productos
    if not carrito.items:
        raise HTTPException(
            status_code=400,
            detail="El carrito está vacío"
        )

    # Crear un nuevo carrito vacío
    nuevo_carrito = models.Carrito()
    db.add(nuevo_carrito)
    db.commit()
    db.refresh(nuevo_carrito)

    # Recorrer los productos enviados en el carrito
    for item in carrito.items:

        # Validar que la cantidad sea mayor a 0
        if item.cantidad <= 0:
            raise HTTPException(
                status_code=400,
                detail="La cantidad debe ser mayor a 0"
            )

        # Buscar el producto en la base de datos
        producto = db.query(models.Producto).filter(
            models.Producto.id == item.producto_id
        ).first()

        # Validar que el producto exista
        if not producto:
            raise HTTPException(
                status_code=404,
                detail=f"Producto con id {item.producto_id} no existe"
            )

        # Crear el registro en la tabla intermedia items_carrito
        item_carrito = models.ItemCarrito(
            carrito_id=nuevo_carrito.id,
            producto_id=item.producto_id,
            cantidad=item.cantidad
        )

        # Agregar el item al carrito
        db.add(item_carrito)

    # Guardar todos los items del carrito
    db.commit()

    # Retornar el carrito creado
    return nuevo_carrito
