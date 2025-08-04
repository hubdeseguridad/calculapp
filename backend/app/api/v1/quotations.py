from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class QuotationItem(BaseModel):
    course_id: int
    quantity: int

class Quotation(BaseModel):
    items: list[QuotationItem] = []

@router.post("/", response_model=dict)
def create_quotation(quotation: Quotation):
    # Aquí puedes guardar en DB o procesar como quieras
    return {
        "message": "Quotation received",
        "quotation": quotation.dict()
    }
