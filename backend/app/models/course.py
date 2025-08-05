from sqlalchemy import Column, Integer, String, Float # pyright: ignore[reportMissingImports]
from app.db.database import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
