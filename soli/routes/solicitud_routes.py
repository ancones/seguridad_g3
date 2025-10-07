from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import database_config
from model.solicitud import Solicitud
from repository.solicitud_repository import SolicitudRepository
from schema.base import SolicitudBase
from middleware.verify_roles import verify_roles, ROLES_LIST
from typing import Annotated
from fastapi import Query

router = APIRouter()
Solicitud.metadata.create_all(bind=database_config.engine)

def get_db() -> Session:
    db = database_config.SessionLocal()
    try:
        yield db
    finally:
        db.close()

solicitud_repository = SolicitudRepository() 

@router.post("/solicitudes/")
async def create_solicitud(solicitud: SolicitudBase, db: Session = Depends(get_db), user_info=Depends(verify_roles(ROLES_LIST["User"]))):
    try:
        updated_solicitud = solicitud.model_copy(update={"user_id": user_info["id"]})
        db_solicitud = solicitud_repository.create_solicitud(db, updated_solicitud.model_dump())
        return db_solicitud
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/solicitudes")
def get_solicitudes(is_formatted: Annotated[ bool, Query(title='Formated SQL')] = True , db: Session = Depends(get_db), user_info=Depends(verify_roles(ROLES_LIST["Admin"], ROLES_LIST["Editor"]))):
    try:
        if is_formatted:
            db_solicitudes = solicitud_repository.get_format_solicitudes(db) 
            return db_solicitudes
        else:
            db_solicitudes = solicitud_repository.get_solicitudes(db) 
            return db_solicitudes
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/solicitudes/{user_id}")
def get_solicitudes_by_user_id(
    user_id: str,
    db: Session = Depends(get_db),
    user_info=Depends(verify_roles(ROLES_LIST["User"], ROLES_LIST["Admin"], ROLES_LIST["Editor"]))
):
    try:
        db_solicitudes = solicitud_repository.get_solicitudes_by_user_id(db, user_id)
        return db_solicitudes
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/solicitud/{id_solicitud}")
def get_solicitud_by_id(
    id_solicitud: str,
    db: Session = Depends(get_db),
    user_info=Depends(verify_roles(ROLES_LIST["User"], ROLES_LIST["Admin"], ROLES_LIST["Editor"]))
):
    try:
        db_solicitud = solicitud_repository.get_solicitud_by_id(db, id_solicitud)
        return db_solicitud
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.patch("/solicitud/{id_solicitud}")
def update_solicitud_by_user_id(
    id_solicitud: str,
    resultado: str | None = None,
    id_estado: int | None = None,
    db: Session = Depends(get_db),
    user_info=Depends(verify_roles(ROLES_LIST["Editor"]))
):
    try:
        db_solicitud = solicitud_repository.update_solicitud(db, id_solicitud, resultado, id_estado)
        return db_solicitud
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
