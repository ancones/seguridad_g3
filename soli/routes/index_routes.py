from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from config.database import database_config

from middleware.verify_jwt import verify_jwt

from model.area import Area
from model.estado_solicitud import EstadoSolicitud
from model.tipo_solicitud import TipoSolicitud
from model.solicitud import Solicitud
from model.queja import Queja

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

@router.get("/metadata")
async def get_metadata(db: Session = Depends(get_db), user_info=Depends(verify_jwt)):
    try:
        solicitudes_count = db.query(func.count(Solicitud.id_solicitud)).scalar()
        quejas_count = db.query(func.count(Queja.id_queja)).scalar()

        return {
            "solicitudes_count": solicitudes_count,
            "quejas_count": quejas_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@router.get("/tipos-solicitud")
async def get_areas(db: Session = Depends(get_db), user_info=Depends(verify_jwt)):
    try:
        tipos_solicitud = db.query(TipoSolicitud).all()
        return tipos_solicitud
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error interno del servidor")


@router.post("/upload/")
async def upload_data(
    nombre: str = Form(...),
    edad: str = Form(...),
    file: UploadFile = File(...)
):

    # Retornar respuesta JSON
    return JSONResponse(
        content={
            "nombre": nombre,
            "edad": edad,
            "filename": file.filename,
            "content_type": file.content_type
        }
    )