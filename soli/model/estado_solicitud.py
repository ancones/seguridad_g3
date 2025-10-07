from sqlalchemy import Column, Integer, String
from config.database import Base

class EstadoSolicitud(Base):
    __tablename__ = "estado_solicitud"

    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)  # Ej: "Pendiente", "En proceso", "Finalizado"
