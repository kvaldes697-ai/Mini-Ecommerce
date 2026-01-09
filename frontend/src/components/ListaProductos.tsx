import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/api";
import type { Producto } from "../types/Producto";
import { useCarrito } from "../context/CarritoContext";

function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    obtenerProductos().then((data) => {
      setProductos(data);
    });
  }, []);

  function formatearPrecio(valor: number) {
    return new Intl.NumberFormat("es-ES").format(valor);
  }

  return (
    <div className="lista-productos">
      <h2 className="lista-titulo">Productos</h2>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <h3 className="producto-nombre">
              {producto.nombre}
            </h3>

            <p className="producto-precio">
              ${formatearPrecio(producto.precio)}
            </p>

            <button
              className="producto-btn"
              onClick={() => agregarProducto(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;
