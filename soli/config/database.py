import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Cargar variables de entorno
load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

URL_DATABASE = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

class DatabaseConfigSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConfigSingleton, cls).__new__(cls)
            cls._instance.engine = create_engine(URL_DATABASE)
            cls._instance.SessionLocal = sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=cls._instance.engine
            )
        return cls._instance

database_config = DatabaseConfigSingleton()
Base = declarative_base()
