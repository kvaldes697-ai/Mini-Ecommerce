import { useState } from "react"
import { crearProducto } from "../services/api"

function NuevoProducto() {
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")

  const [mensaje, setMensaje] = useState<string | null>(null)

  async function manejarSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!nombre && !precio) {
      setMensaje("Debe ingresar el nombre y el precio del producto")
      return
    }

    if (!nombre) {
      setMensaje("Debe ingresar el nombre del producto")
      return
    }

    if (!precio) {
      setMensaje("Debe ingresar el precio del producto")
      return
    }

    await crearProducto(nombre, Number(precio))

    setNombre("")
    setPrecio("")

    setMensaje("Producto creado correctamente")
  }

  function cerrarMensaje() {
    setMensaje(null)
  }

  return (
    <>
      {mensaje && (
        <div className="modal-overlay" onClick={cerrarMensaje}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="modal-text">{mensaje}</p>

            <button
              className="modal-btn"
              onClick={cerrarMensaje}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <form className="nuevo-producto-form" onSubmit={manejarSubmit}>
        <h2 className="form-title">Nuevo producto</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Precio"
          value={precio}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setPrecio(e.target.value)
            }
          }}
        />

        <button type="submit">
          Crear producto
        </button>
      </form>
    </>
  )
}

export default NuevoProducto
