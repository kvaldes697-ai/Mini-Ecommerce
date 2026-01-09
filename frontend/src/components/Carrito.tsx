import { useCarrito } from "../context/CarritoContext";
import ItemCarrito from "./ItemCarrito";

function Carrito() {
  const { items, guardarCarritoBackend } = useCarrito();

  const total = items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  function formatearPrecio(valor: number) {
    return new Intl.NumberFormat("es-ES").format(valor);
  }

  function manejarGuardar() {
    if (total === 0) {
      alert("No se puede guardar un carrito con total 0");
      return;
    }

    guardarCarritoBackend();
  }

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito</h2>

      {items.length === 0 && (
        <p className="carrito-vacio">
          El carrito está vacío
        </p>
      )}

      {items.map((item) => (
        <ItemCarrito
          key={item.producto.id}
          item={item}
        />
      ))}

      {items.length > 0 && (
        <>
          <h3 className="carrito-total">
            Total: ${formatearPrecio(total)}
          </h3>

          <button
            className="carrito-guardar"
            onClick={manejarGuardar}
            disabled={total === 0}
          >
            Guardar carrito
          </button>

          {total === 0 && (
            <p className="carrito-error">
              No se puede guardar un carrito con total 0
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Carrito;
