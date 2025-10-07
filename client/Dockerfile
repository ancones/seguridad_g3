# Imagen base ligera y actualizada
FROM node:24-alpine3.21

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la app
COPY . .

# Expone el puerto por defecto del servidor de desarrollo de Vite
EXPOSE 3000

# Comando por defecto para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]
