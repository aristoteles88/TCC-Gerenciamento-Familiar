from fastapi import APIRouter, Depends, HTTPException
from app.models.family import FamilyCreate, FamilyOut
from app.crud.family import create_family, get_family_by_id

router = APIRouter(prefix="/families", tags=["families"])

@router.post("/", response_model=FamilyOut, status_code=201)
async def create_new_family(family: FamilyCreate):
    """Create a new family group"""
    return await create_family(family)

@router.get("/{family_id}", response_model=FamilyOut)
async def get_family(family_id: str):
    """Get a family by its ID"""
    return await get_family_by_id(family_id)