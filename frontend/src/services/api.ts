const URL_BASE = "http://127.0.0.1:8000"

export async function crearProducto(nombre: string, precio: number) {
  const respuesta = await fetch(`${URL_BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      precio,
    }),
  })

  return respuesta.json()
}

export async function obtenerProductos() {
  const respuesta = await fetch(`${URL_BASE}/products`)
  return respuesta.json()
}

export async function guardarCarrito(items: any[]) {
  const respuesta = await fetch(`${URL_BASE}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items,
    }),
  })

  return respuesta.json()
}
