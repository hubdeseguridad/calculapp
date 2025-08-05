from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.config import settings

router = APIRouter()

class LoginRequest(BaseModel):
    password: str

@router.post("/", summary="Autenticación del administrador")
def login(request: LoginRequest):
    if request.password != settings.admin_password:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    
    # Token simple, en este caso la misma contraseña
    return {"token": settings.admin_password}
