import { createContext, useContext, useEffect, useState } from "react";
import type { Producto } from "../types/Producto";
import type { ItemCarrito } from "../types/Carrito";
import { guardarCarrito } from "../services/api";

interface CarritoContextoTipo {
  items: ItemCarrito[];
  agregarProducto: (producto: Producto) => void;
  actualizarCantidad: (idProducto: number, cantidad: number) => void
  eliminarProducto: (idProducto: number) => void;
  guardarCarritoBackend: () => void
}

const CarritoContext = createContext<CarritoContextoTipo | undefined>(
  undefined
);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setItems(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  function agregarProducto(producto: Producto) {
    setItems((prev) => {
      const existe = prev.find((item) => item.producto.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { producto, cantidad: 1 }];
    });
  }
  function actualizarCantidad(idProducto: number, cantidad: number) {
  setItems((prev) =>
    prev.map((item) =>
      item.producto.id === idProducto
        ? { ...item, cantidad }
        : item
    )
  )
}

  function eliminarProducto(idProducto: number) {
    setItems((prev) => prev.filter((item) => item.producto.id !== idProducto));
  }

  async function guardarCarritoBackend() {
  const itemsValidos = items.filter(item => item.cantidad > 0)

  if (itemsValidos.length === 0) {
    alert("El carrito no tiene productos válidos")
    return
  }

  await guardarCarrito(
    itemsValidos.map((item) => ({
      producto_id: item.producto.id,
      cantidad: item.cantidad,
    }))
  )

  setItems([])
  localStorage.removeItem("carrito")
  alert("Carrito guardado correctamente")
}


  return (
    <CarritoContext.Provider
  value={{
    items,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    guardarCarritoBackend,}}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return contexto;
}
