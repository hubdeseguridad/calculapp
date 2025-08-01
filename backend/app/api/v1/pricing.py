from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.pricing import PricingRequest, PricingResponse
from app.services.pricing_service import calculate_pricing

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PricingResponse)
def calculate_price(data: PricingRequest, db: Session = Depends(get_db)):
    return calculate_pricing(db, data)
