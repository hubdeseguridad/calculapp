import math
from sqlalchemy.orm import Session
from app.models.course import Course
from app.schemas.pricing import PricingRequest, PricingResponse

def calculate_discount_rate(total_licenses: int) -> float:
    if total_licenses <= 0:
        return 0.0
    if total_licenses >= 10000:
        return 0.6
    # 0 < x < 10000 → 0.075 * log10(x), máximo 0.6
    return min(0.075 * math.log10(total_licenses), 0.6)

def calculate_pricing(db: Session, data: PricingRequest) -> PricingResponse:
    subtotal = 0.0
    total_licenses = 0

    for item in data.items:
        course = db.query(Course).filter(Course.id == item.course_id).first()
        if course:
            subtotal += course.price * item.quantity
            total_licenses += item.quantity

    # Usar la nueva fórmula de descuento
    discount_rate = calculate_discount_rate(total_licenses)

    total = subtotal * (1 - discount_rate)
    unit_price = total / total_licenses if total_licenses > 0 else 0

    return PricingResponse(
        total_licenses=total_licenses,
        discount_rate=discount_rate,
        subtotal=subtotal,
        total=total,
        unit_price=unit_price
    )
