import os
from dotenv import load_dotenv
from fastapi import Header, HTTPException, status

load_dotenv()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app/db.sqlite3")

def verify_admin(x_admin_token: str = Header(...)):
    if x_admin_token != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin token")
