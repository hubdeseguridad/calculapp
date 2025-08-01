from fastapi import FastAPI
from app.api.v1 import courses, pricing
from app.db.database import Base, engine
from app.models import course

# Crear tablas automáticamente si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CalculAPP API", version="0.1.0")

app.include_router(courses.router, prefix="/api/v1/courses", tags=["Courses"])
app.include_router(pricing.router, prefix="/api/v1/pricing", tags=["Pricing"])

@app.get("/", tags=["Health"])
def read_root():
    return {"status": "ok", "message": "CalculAPP Backend Running"}
