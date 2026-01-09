Durante el desarrollo de esta prueba técnica implementé un mini ecommerce utilizando una arquitectura separada de frontend y backend. Para el backend utilicé FastAPI con Python, junto con SQLAlchemy para la gestión de la base de datos y SQLite como motor de persistencia. El backend expone endpoints para la gestión de productos y para el manejo del carrito de compras, incluyendo la creación y consulta de carritos almacenados.

En el frontend desarrollé la aplicación utilizando React con TypeScript, apoyándome en Context API para manejar el estado global del carrito. Desde la interfaz es posible listar productos, crear nuevos productos, agregarlos al carrito y modificar sus cantidades de forma manual mediante inputs editables. Cada producto muestra su subtotal calculado dinámicamente y el carrito muestra el total general en tiempo real.

Una decisión técnica importante fue separar claramente el estado visual del input del estado real del carrito. El input de cantidad permite que el usuario borre temporalmente el valor mientras escribe, pero el estado global del carrito es la única fuente de verdad para los cálculos y la persistencia. Esta separación evita inconsistencias entre lo que el usuario ve y los datos que finalmente se envían al backend.

Para mantener la coherencia entre el subtotal y el total del carrito, permití que el estado global aceptara cantidades temporales iguales a cero mientras el usuario edita. Sin embargo, la validación de negocio se realiza al momento de guardar el carrito. Si el total del carrito es cero, el sistema bloquea el guardado y muestra un mensaje claro al usuario indicando que no se pueden guardar carritos sin valor comercial.

El botón “Guardar carrito” envía los productos y sus cantidades al backend únicamente cuando el carrito cumple las reglas establecidas. En el backend se realiza una validación adicional para que el carrito no esté vacío, que los productos existan y que las cantidades sean válidas antes de persistir la información en la base de datos.

Dependencias instaladas

Durante el desarrollo de la prueba técnica instalé las siguientes dependencias:

En el backend, utilicé Python y creé un entorno virtual para aislar las dependencias del proyecto. Instalé FastAPI como framework principal para la creación de la API REST, Uvicorn como servidor ASGI para ejecutar la aplicación, SQLAlchemy para la gestión de la base de datos y Pydantic para la validación de datos de entrada y salida. También utilicé SQLite como motor de base de datos por su simplicidad y facilidad de uso en una prueba técnica.

Las dependencias del backend quedaron registradas en el archivo requirements.txt, permitiendo reproducir el entorno de forma sencilla.

En el frontend, lo inicialicé utilizando Vite con la plantilla de React + TypeScript. Instalé las dependencias necesarias mediante npm, incluyendo React, React DOM y las herramientas propias de Vite para el entorno de desarrollo y compilación.


Estructura de carpetas y archivos creados

Se crearon las siguientes carpetas y archivos:

-Carpeta raíz

Mini Ecommerce/
Carpeta principal que contiene el frontend, el backend y el archivo de documentación.

-README.md
Archivo de documentación, decisiones técnicas y forma de ejecución.

-Backend

backend/
Carpeta que contiene toda la lógica del servidor y la API.

backend/app/
Carpeta principal de la aplicación FastAPI.

backend/app/main.py
Archivo de entrada de la aplicación FastAPI. Configura la app, inicializa la base de datos y registra las rutas.

backend/app/database.py
Configura la conexión a la base de datos SQLite y la sesión de SQLAlchemy.

backend/app/models.py
Define los modelos de base de datos (Producto, Carrito, ItemCarrito).

backend/app/schemas.py
Define los esquemas Pydantic para validación y serialización de datos.

backend/app/routes/
Carpeta que contiene las rutas de la API.

backend/app/routes/products.py
Endpoints para listar y crear productos.

backend/app/routes/cart.py
Endpoints para guardar y consultar carritos.

backend/requirements.txt
Lista de dependencias del backend.

backend/venv/
Entorno virtual de Python (no se sube al repositorio).

-Frontend

frontend/
Carpeta que contiene la aplicación React.

frontend/src/
Código fuente del frontend.

frontend/src/components/
Componentes visuales de la aplicación.

frontend/src/components/ListaProductos.tsx
Muestra el listado de productos disponibles.

frontend/src/components/ItemCarrito.tsx
Representa un producto dentro del carrito y permite editar la cantidad.

frontend/src/components/Carrito.tsx
Muestra el carrito completo, el total y permite guardar el carrito.

frontend/src/components/NuevoProducto.tsx
Encargado de permitir la creación de nuevos productos desde el frontend.

frontend/src/context/CarritoContext.tsx
Maneja el estado global del carrito utilizando Context API.

frontend/src/services/api.ts
Contiene las funciones para comunicarse con el backend mediante HTTP.

frontend/src/App.tsx
Componente principal de la aplicación.

frontend/package.json
Archivo de configuración del frontend y sus dependencias.


Cómo Ejecutar

-Ejecutar el backend

Ubicarse en la carpeta backend:

cd backend


Crear y activar el entorno virtual (opcional si ya existe):

python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate  # Linux / Mac


Instalar las dependencias:

pip install -r requirements.txt


Ejecutar el servidor:

uvicorn app.main:app --reload


El backend quedará disponible en:

http://127.0.0.1:8000


-Ejecutar el frontend

Ubicarse en la carpeta frontend:

cd frontend


Instalar las dependencias:

npm install


Ejecutar el servidor de desarrollo:

npm run dev


El frontend quedará disponible en:

http://localhost:5173

