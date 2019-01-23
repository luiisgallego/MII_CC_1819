# Contenedor de origen
FROM node:10-alpine                            
MAINTAINER Luis Gallego <lgaq94@gmail.com>
# Directorio de trabajo
WORKDIR /usr/src/app

# Instalamos todas las dependencias
COPY package.json ./
RUN npm install

# Copiamos los archivos necesarios de la aplicacion
COPY ./items.js .
COPY ./index.js .
COPY ./test ./test

# Escuchamos por el puerto 80
EXPOSE 80
# Arrancamos la aplicacion
CMD [ "npm", "start" ]
