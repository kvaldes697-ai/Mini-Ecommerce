import { useState, useEffect } from "react";
import type { ItemCarrito } from "../types/Carrito";
import { useCarrito } from "../context/CarritoContext";

function itemCarrito({ item }: { item: ItemCarrito }) {
  const { eliminarProducto, actualizarCantidad } = useCarrito();

  const [cantidadInput, setCantidadInput] = useState(
    item.cantidad.toString()
  );

  useEffect(() => {
    setCantidadInput(item.cantidad.toString());
  }, [item.cantidad]);

  function formatearPrecio(valor: number) {
    return new Intl.NumberFormat("es-ES").format(valor);
  }

  const cantidad = cantidadInput === "" ? 0 : Number(cantidadInput);
  const subtotal =
    cantidad > 0 ? item.producto.precio * cantidad : 0;

  return (
    <div className="item-carrito">
      <span className="item-nombre">
        {item.producto.nombre}
      </span>

      <div className="item-cantidad">
        <input
          type="text"
          value={cantidadInput}
          onChange={(e) => {
            const valor = e.target.value;

            if (valor === "" || /^\d+$/.test(valor)) {
              setCantidadInput(valor);
              actualizarCantidad(
                item.producto.id,
                valor === "" ? 0 : Number(valor)
              );
            }
          }}
        />
      </div>

      <span className="item-subtotal">
        Sub: ${formatearPrecio(subtotal)}
      </span>

      <button
        className="item-eliminar"
        onClick={() => eliminarProducto(item.producto.id)}
      >
        Eliminar
      </button>
    </div>
  );
}

export default itemCarrito;
