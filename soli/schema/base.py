from pydantic import BaseModel
from datetime import date

class QuejaBase(BaseModel):
    id_queja:int | None = None

    user_id:str | None = None

    descripcion:str
    medida_tomada:str | None = None
    
class SolicitudBase(BaseModel):

    id_solicitud:int | None = None

    user_id:str | None = None

    id_area:int
    id_tipo_solicitud:int
    id_estado:int

    descripcion:str
    resultado:str | None = None

