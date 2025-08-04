from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.config import ADMIN_PASSWORD

router = APIRouter()

class LoginRequest(BaseModel):
    password: str

@router.post("/")
def login(request: LoginRequest):
    if request.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    # Token simple, en este caso la misma contraseña
    return {"token": ADMIN_PASSWORD}
