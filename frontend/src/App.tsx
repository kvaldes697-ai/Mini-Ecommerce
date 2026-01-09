import "./App.css";
import ListaProductos from "./components/ListaProductos";
import Carrito from "./components/Carrito";
import NuevoProducto from "./components/NuevoProducto";

function App() {
  return (
    <div className="app">
      <h1 className="titulo">Mini Ecommerce</h1>

      <div className="nuevo-producto">
        <NuevoProducto />
      </div>

      <ListaProductos />

      <div className="carrito">
        <Carrito />
      </div>
    </div>
  );
}

export default App;
