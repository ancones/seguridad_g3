# Imagen base
FROM node:24-alpine3.21

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código de la app
COPY . .

# Expone el puerto (ajusta si usas otro)
EXPOSE 3500

# Comando por defecto para iniciar la app
CMD ["node", "server.js"]
