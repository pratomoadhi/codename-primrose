# backend/routers/employees.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Employee
from pydantic import BaseModel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class EmployeeSchema(BaseModel):
    name: str
    email: str
    position: str
    department: str
    salary: float

    class Config:
        orm_mode = True

@router.post("/")
def create_employee(employee: EmployeeSchema, db: Session = Depends(get_db)):
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@router.get("/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()
