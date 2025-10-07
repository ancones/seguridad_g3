from sqlalchemy.orm import Session
from model.queja import Queja
from sqlalchemy import text

class QuejaRepository:
    def create_queja(self, db: Session, queja_data):
        db_queja = Queja(**queja_data)
        db.add(db_queja)
        db.commit()
        db.refresh(db_queja)
        return db_queja

    def get_quejas(self, db: Session):
        return db.query(Queja).all()

    def get_format_quejas(self, db: Session):
        query = text("""
            SELECT 
                q.id_queja AS "ID", 
                q.user_id AS "Usuario", 
                q.descripcion AS "Description", 
                q.medida_tomada AS "Medida Tomada"
            FROM queja q
        """)
        return db.execute(query).mappings().all()
    
    def get_quejas_by_user_id(self, db: Session, user_id: str):
        query = text("""
            SELECT 
                q.id_queja AS "ID", 
                q.user_id AS "Usuario", 
                q.descripcion AS "Description", 
                q.medida_tomada AS "Medida Tomada"
            FROM queja q
            WHERE q.user_id = :user_id
        """)
        return db.execute(query, {"user_id": user_id}).mappings().all()