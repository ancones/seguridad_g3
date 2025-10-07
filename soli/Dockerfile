# Usa una imagen base oficial de Python
FROM python:3.11-slim

# Crea un directorio de trabajo
WORKDIR /app

# Copia los requisitos primero (para aprovechar el cache)
COPY requirements.txt .

# Instala dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación
COPY . .

# Expone el puerto (FastAPI por defecto usa 8000)
EXPOSE 8000

# Comando por defecto (se puede sobreescribir desde Compose)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
