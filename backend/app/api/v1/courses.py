from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.course import Course, CourseCreate, CourseUpdate
from app.services.course_service import (
    get_courses, get_course, create_course, update_course, delete_course
)

from app.core.config import verify_admin

router = APIRouter()

@router.get("/", response_model=List[Course])
def list_courses(db: Session = Depends(get_db)):
    return get_courses(db)

@router.get("/{course_id}", response_model=Course)
def read_course(course_id: int, db: Session = Depends(get_db)):
    course = get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=Course, dependencies=[Depends(verify_admin)])
def create_new_course(course: CourseCreate, db: Session = Depends(get_db)):
    return create_course(db, course)

@router.put("/{course_id}", response_model=Course, dependencies=[Depends(verify_admin)])
def update_existing_course(course_id: int, course: CourseUpdate, db: Session = Depends(get_db)):
    updated = update_course(db, course_id, course)
    if not updated:
        raise HTTPException(status_code=404, detail="Course not found")
    return updated

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(verify_admin)])
def delete_existing_course(course_id: int, db: Session = Depends(get_db)):
    deleted = delete_course(db, course_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Course not found")

