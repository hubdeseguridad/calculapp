import os
from dotenv import load_dotenv # pyright: ignore[reportMissingImports]
from fastapi import Header, HTTPException, status # pyright: ignore[reportMissingImports]

load_dotenv()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")
DATABASE_URL_SQLITE = os.getenv("DATABASE_URL_SQLITE", "sqlite:///./app/db.sqlite3")
DATABASE_URL_POSTGRES = os.getenv("DATABASE_URL_POSTGRES")

def get_database_url():
    # Aquí puedes hacer lógica avanzada, por ejemplo, probar conexión a internet
    # o usar variable de entorno APP_ENV
    app_env = os.getenv("APP_ENV", "local")
    if app_env == "production" and DATABASE_URL_POSTGRES:
        return DATABASE_URL_POSTGRES
    return DATABASE_URL_SQLITE

def verify_admin(x_admin_token: str = Header(...)):
    if x_admin_token != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin token")
