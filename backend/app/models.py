# Importaciones necesarias de SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

# Base de la base de datos
from .database import Base


# Modelo Producto
# Representa los productos disponibles en el ecommerce
class Producto(Base):
    __tablename__ = "productos"

    # Identificador único del producto
    id = Column(Integer, primary_key=True, index=True)

    # Nombre del producto
    nombre = Column(String, nullable=False)

    # Precio del producto
    precio = Column(Float, nullable=False)

    # Relación con los items del carrito
    # Un producto puede estar en muchos items de carrito
    items_carrito = relationship(
        "ItemCarrito",
        back_populates="producto"
    )


# Modelo Carrito
# Representa un carrito de compras
class Carrito(Base):
    __tablename__ = "carritos"

    # Identificador único del carrito
    id = Column(Integer, primary_key=True, index=True)

    # Relación con los items del carrito
    # Un carrito puede tener muchos items
    items = relationship(
        "ItemCarrito",
        back_populates="carrito"
    )


# Modelo ItemCarrito
# Tabla intermedia entre Carrito y Producto
class ItemCarrito(Base):
    __tablename__ = "items_carrito"

    # Identificador único del item
    id = Column(Integer, primary_key=True, index=True)

    # Clave foránea al carrito
    carrito_id = Column(Integer, ForeignKey("carritos.id"))

    # Clave foránea al producto
    producto_id = Column(Integer, ForeignKey("productos.id"))

    # Cantidad del producto en el carrito
    cantidad = Column(Integer, nullable=False)

    # Relación hacia el carrito
    carrito = relationship(
        "Carrito",
        back_populates="items"
    )

    # Relación hacia el producto
    producto = relationship(
        "Producto",
        back_populates="items_carrito"
    )
