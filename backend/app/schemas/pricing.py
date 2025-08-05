from pydantic import BaseModel # pyright: ignore[reportMissingImports]
from typing import List

class QuotationItem(BaseModel):
    course_id: int
    quantity: int

class PricingRequest(BaseModel):
    items: List[QuotationItem]

class PricingResponse(BaseModel):
    total_licenses: int
    discount_rate: float
    subtotal: float
    total: float
    unit_price: float
