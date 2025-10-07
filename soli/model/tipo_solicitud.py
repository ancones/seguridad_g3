from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base
from model.area import *
from model.solicitud import *

class TipoSolicitud(Base):
    __tablename__ = "tipo_solicitud"

    id_tipo_solicitud = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)

    id_area = Column(Integer, ForeignKey("area.id_area"), nullable=False)
    area = relationship("Area", back_populates="tipos_solicitud")

    solicitudes = relationship("Solicitud", back_populates="tipo_solicitud")
