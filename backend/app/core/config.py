from pydantic_settings import BaseSettings
from functools import lru_cache
from fastapi import Header, HTTPException, status # pyright: ignore[reportMissingImports]

class Settings(BaseSettings):
    # App configuration
    app_name: str = "CalculApp"
    app_env: str = "local"  # "local" o "production"
    app_debug: bool = False

    # Security
    admin_password: str = "admin123"
    secret_key: str = "changeme"

    # Databases
    database_url_sqlite: str = "sqlite:///./app/db.sqlite3"
    database_url_postgres: str | None = None

    class Config:
        env_file = ".env"  # Carga automática de variables desde .env

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()

def get_database_url() -> str:
    """
    Devuelve la URL de base de datos adecuada según el entorno.
    - Si APP_ENV=production y existe database_url_postgres → usa PostgreSQL.
    - En cualquier otro caso → usa SQLite.
    """
    if settings.app_env == "production" and settings.database_url_postgres:
        return settings.database_url_postgres
    return settings.database_url_sqlite

def verify_admin(x_admin_token: str = Header(...)):
    """
    Verifica el token de administrador.
    Actualmente el token válido es igual a la contraseña configurada.
    """
    if x_admin_token != settings.admin_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin token"
        )
