# Contenedores para despliegue en la nube

Como último hito nos enfrentamos al despligue mediante contenedores *Docker* de nuestra aplicación. Tras leer y comprender la documentación encontrada [aquí](http://jj.github.io/CC/documentos/temas/Contenedores) y realizados parte de los ejercicios que se proponían, los cuales podemos encontrar [aquí](https://github.com/luiisgallego/MII_CC_EJERCICIOS_1819/blob/master/Tema6/Documentacion.md), hemos pasado a definir nuestro propio *Dockerfile*.

A modo de unificar toda la funcionalidad de nuestra aplicación en un solo *Dockerfile*, principalmente en cuanto al servicio de base de datos, instalado en *MongoDB* en el anterior hito, se ha vuelto a utulizar bajo el servicio *mlab*. De esta forma, nuestro proyecto solo requiere de una imagen que, preferiblemente, tenga instalado *Node.js*.

Aclarado el anterior punto, ya podemos comenzar la definición del *Dockerfile*. 

## Dockerfile

En las siguientes lineas se justicará cada orden usada nuestro archivo de *Docker*. La cuestión principal que surge es referente a que imagen usar. Como habíamos comentado anteriormente, la idea principal es usar una imagen que tenga *Node.js* por defecto. Esto lo podemos definir en el *Dockefile* mediante la instrucción FROM (FROM node:10-alpine). Como veremos más adelante, en las primeras preubas se usó una imagen con *Node.js* que no era *alpine*, pero el peso de dicha imagen era bastante elevado.

Posteriormente hemos mediante la instrucción *LABEL* a modo informativo la versión de nuestro proyecto definimos y el encargado de su creación mediante *MAINTAINER*. También hemos establecido el directorio donde trabajaremos, mediante la instrucción *WORKDIR*. Este directorio será el usado para copiar los archivos necesarios de nuestra aplicación, instalar dependencias y ejecutar dicha aplicación mediante *CMD*. Ahora, siguiendo las pautas que establece *Docker* y los requisitos de nuestra aplicación, es el momento de instalar las dependencias, para ello primero copiamos el archivo donde tenemos definidas las dependencias, *package.json* e instalamos con *RUN*. 

Una vez que nuestra imagen tiene todas las dependencias (Expres, Mongoose, Mocha, etc), podemos copiar los archivos mínimos para que nuestra aplicación funcione, incluso los test, esto se ha realizado mediante la instrucción *COPY* y haciendo uso del punto final establecemos que se copie en el directorio de trabajo creado previamente. Llegados a este punto ya estamos listos para ejecutar la aplicación, esto lo hacemos con la instrucción *CMD* a la que le indicamos la orden que venimos usando para lanzar la aplicación creada con *Node.js*. Como detalle importante, es necesario que podamos escuchar el puerto 80 exteriormente, esto lo conseguimos mediante *EXPOSE*. 

## Ejemplo de construcción y uso


