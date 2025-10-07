from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import database_config

from middleware.verify_jwt import verify_jwt

from model.area import Area
from model.estado_solicitud import EstadoSolicitud
from model.tipo_solicitud import TipoSolicitud

router = APIRouter()
Area.metadata.create_all(bind=database_config.engine)
TipoSolicitud.metadata.create_all(bind=database_config.engine)
EstadoSolicitud.metadata.create_all(bind=database_config.engine)

def get_db() -> Session:
    db = database_config.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/areas")
async def get_areas(db: Session = Depends(get_db), user_info=Depends(verify_jwt)):
    try:
        areas = db.query(Area).all()
        return areas
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/estados-solicitud")
async def get_estados_solicitud(db: Session = Depends(get_db), user_info=Depends(verify_jwt)):
    try:
        estados_solicitud = db.query(EstadoSolicitud).all()
        return estados_solicitud
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/tipos-solicitud")
async def get_areas(db: Session = Depends(get_db), user_info=Depends(verify_jwt)):
    try:
        tipos_solicitud = db.query(TipoSolicitud).all()
        return tipos_solicitud
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")
