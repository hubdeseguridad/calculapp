from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import courses, pricing, auth, quotations
from app.db.database import Base, engine
from app.models import course

# Crear tablas automáticamente si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CalculAPP API", version="0.1.0")

# Configuración CORS
origins = [
    "http://localhost:5173",  # Vite
    "http://127.0.0.1:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(courses.router, prefix="/api/v1/courses", tags=["Courses"])
app.include_router(pricing.router, prefix="/api/v1/pricing", tags=["Pricing"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(quotations.router, prefix="/api/v1/quotations", tags=["Quotations"])

@app.get("/", tags=["Health"])
def read_root():
    return {"status": "ok", "message": "CalculAPP Backend Running"}
