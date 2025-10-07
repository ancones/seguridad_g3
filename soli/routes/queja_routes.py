from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import database_config
from model.queja import Queja
from repository.queja_repository import QuejaRepository
from schema.base import QuejaBase
from middleware.verify_roles import verify_roles, ROLES_LIST


router = APIRouter()
Queja.metadata.create_all(bind=database_config.engine)

def get_db() -> Session:
    db = database_config.SessionLocal()
    try:
        yield db
    finally:
        db.close()

queja_repository = QuejaRepository() 

@router.post("/quejas/")
async def create_quejas(queja: QuejaBase, db: Session = Depends(get_db), user_info=Depends(verify_roles(ROLES_LIST["User"]))):
    try:
        updated_queja = queja.model_copy(update={"user_id": user_info["id"]})
        db_queja = queja_repository.create_queja(db, updated_queja.model_dump())
        return db_queja
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/quejas")
def get_quejas(db: Session = Depends(get_db), user_info=Depends(verify_roles(ROLES_LIST["Admin"], ROLES_LIST["Editor"]))):
    try:
        db_quejas = queja_repository.get_format_quejas(db) 
        return db_quejas
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/quejas/{id_cliente}")
def get_queja_de_cliente(id_cliente: str, db: Session = Depends(get_db), user_info=Depends(verify_roles(ROLES_LIST["User"], ROLES_LIST["Admin"], ROLES_LIST["Editor"]))):
    try:
        quejas = queja_repository.get_quejas_by_user_id(db, id_cliente)  
        return quejas        
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error interno del servidor")
