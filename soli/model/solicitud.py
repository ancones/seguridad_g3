from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from config.database import Base
from model.area import *
from model.estado_solicitud import *
from model.tipo_solicitud import *

class Solicitud(Base):
    __tablename__ = "solicitud"

    id_solicitud = Column(Integer, primary_key=True, index=True, autoincrement=True)

    user_id = Column(String, nullable=False)  # ObjectId MongoDB (string)

    id_area = Column(Integer, ForeignKey("area.id_area"), nullable=False)
    area = relationship("Area", back_populates="solicitudes")

    id_tipo_solicitud = Column(Integer, ForeignKey("tipo_solicitud.id_tipo_solicitud"), nullable=False)
    tipo_solicitud = relationship("TipoSolicitud", back_populates="solicitudes")

    id_estado = Column(Integer, ForeignKey("estado_solicitud.id_estado"), nullable=False)
    estado = relationship("EstadoSolicitud")

    descripcion = Column(Text, nullable=False)
    resultado = Column(Text)  # Cómo se finalizó la solicitud
