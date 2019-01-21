# Dockerfile para la aplicacion con mlab

# Contenedor de origen (probar alpine)
FROM node:8                              
MAINTAINER Luis Gallego <lgaq94@gmail.com>
# Directorio de trabajo,en él se va a entrar cuando se ejecute algo en el contenedor
WORKDIR /usr/src/app

# Instalamos todas las dependencias
COPY package*.json ./
RUN npm install

# Copiamos los archivos necesarios de la aplicacion
COPY ./items.js .
COPY ./index.js .
COPY ./test ./test

# Indicamos que escuche el puerto 80
EXPOSE 80
# Arrancamos la aplicacion
CMD [ "npm", "start" ]
