# Contenedor de origen
FROM node:10-alpine  
LABEL version="5.0" MAINTAINER="Luis Gallego <lgaq94@gmail.com>"
# Directorio de trabajo
WORKDIR /items

# Instalamos todas las dependencias
COPY package.json ./
RUN npm install

# Copiamos los archivos necesarios de la aplicacion
COPY ./items.js .
COPY ./index.js .
COPY ./test ./test

# Variable de entornio para mlab
ENV PASSMLAB /items/index.js

# Arrancamos la aplicacion
CMD [ "npm", "start" ]

# Escuchamos por el puerto 80
EXPOSE 80
