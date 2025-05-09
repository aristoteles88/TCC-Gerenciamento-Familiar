from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId
from app.models.family import FamilyCreate, FamilyOut
from fastapi import HTTPException, Request

async def create_family(request: Request, family: FamilyCreate):
    db = request.app.db
    families = db.families
    family_dict = family.model_dump(by_alias=True, exclude={"id"})
    family_dict.update({
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    })
    
    result = await families.insert_one(family_dict)
    if not result.inserted_id:
        raise HTTPException(500, "Falha ao criar a família")
    
    created_family = await families.find_one({"_id": result.inserted_id})
    if created_family:
        created_family["_id"] = str(created_family["_id"])
    else:
        raise HTTPException(500, "Falha ao criar a família")
    return FamilyOut(**created_family)

async def get_family_by_id(request: Request, family_id: str):
    try:
        db = request.app.db
        families = db.families
        family = await families.find_one({"_id": family_id})
        if not family:
            raise HTTPException(404, "Família não encontrada")
        family["_id"] = str(family["_id"])
        return FamilyOut(**family)
    except InvalidId:
        raise HTTPException(400, "Formato de ID inválido")