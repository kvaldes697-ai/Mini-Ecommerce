# Importaciones de SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# URL de conexión a la base de datos
# Se usa SQLite para simplificar la prueba técnica
URL_BASE_DATOS = "sqlite:///./mini_ecommerce.db"


# Crear el motor de la base de datos
# check_same_thread=False Es necesario para SQLite con FastAPI
motor = create_engine(
    URL_BASE_DATOS,
    connect_args={"check_same_thread": False}
)


# Sesión local para interactuar con la base de datos
# autocommit=False Los cambios se guardan manualmente
# autoflush=False Evita guardar cambios automáticamente
SesionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=motor
)


# Base para crear los modelos de la base de datos
# Todas las tablas heredan de esta clase
Base = declarative_base()
