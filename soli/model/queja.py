from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from config.database import Base
from model.area import *

class Queja(Base):
    __tablename__ = "queja"

    id_queja = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, nullable=False)  # ObjectId de MongoDB

    descripcion = Column(Text, nullable=False)
    medida_tomada = Column(Text)  # Qué se hizo como respuesta a la queja
