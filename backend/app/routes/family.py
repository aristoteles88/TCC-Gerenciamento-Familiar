from fastapi import APIRouter, Depends, HTTPException, Request
from app.models.family import FamilyCreate, FamilyOut
from app.crud.family import create_family, get_family_by_id

router = APIRouter()

@router.post("/", response_model=FamilyOut, status_code=201)
async def create_new_family(request: Request, family: FamilyCreate):
    """Create a new family group"""
    return await create_family(request, family)

@router.get("/{family_id}", response_model=FamilyOut)
async def get_family(request: Request, family_id: str):
    """Get a family by its ID"""
    return await get_family_by_id(request, family_id)