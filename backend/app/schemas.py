# Importaciones de Pydantic para validación de datos
from pydantic import BaseModel, Field

# List se usa para manejar listas de items
from typing import List


# Esquema base de Producto
# Se usa para crear productos
class ProductoBase(BaseModel):
    # Nombre del producto
    nombre: str

    # Precio del producto
    # gt=0 valida que el precio sea mayor a 0
    precio: float = Field(..., gt=0)


# Esquema de respuesta para Producto
# Se usa cuando se devuelve un producto desde la API
class ProductoRespuesta(ProductoBase):
    # Identificador del producto
    id: int

    class Config:
        # Permite convertir automáticamente desde modelos SQLAlchemy
        from_attributes = True


# Esquema base para los items del carrito
class ItemCarritoBase(BaseModel):
    # ID del producto
    producto_id: int

    # Cantidad del producto
    cantidad: int


# Esquema para crear un carrito
# Contiene una lista de items
class CarritoCrear(BaseModel):
    items: List[ItemCarritoBase]


# Esquema de respuesta para un carrito
class CarritoRespuesta(BaseModel):
    # ID del carrito
    id: int

    # Lista de productos dentro del carrito
    items: List[ItemCarritoBase]

    class Config:
        # Permite mapear datos desde SQLAlchemy
        from_attributes = True
