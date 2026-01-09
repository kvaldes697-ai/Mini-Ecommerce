import type { Producto } from "./Producto"

export interface ItemCarrito {
  producto: Producto
  cantidad: number
}

export interface Carrito {
  items: ItemCarrito[]
}
