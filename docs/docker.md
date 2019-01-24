# COMANDOS DOCKER

Una vez construido el *Dockerfile* podemos usar los siguientes comandos para interacturar:

- Creamos la imagen, añadimos la opcion *-t* para incluir un tag específico para poder identificar la nueva imagen. Importante el punto final:
    ~~~
    docker build -t luiisgallego/nombreImagen .
    ~~~
- Ahora podemos ver que se ha creado correctamente:
    ~~~
    docker images
    ~~~
- Una vez que lo hemos comprobado, ya estamos listos para lanzar la aplicación. Este paso es importante en cuanto a los puertos para poder acceder. En nuestra *Dockerfile* hemos especificado mediante *EXPOSE* que la aplicación corra en el puerto 80, ahora para poder usar la aplicación de forma local mediante curl, tenemos que redirigir ese puerto a cualquiera que nosotros decidamos, por ejemplo,49160. Esto se hace con *-p*. Finalmente con *-d* indicamos la imagen que queremos ejecutar:
    ~~~
     docker run -p 49160:80 -d luiisgallego/nombreImagen
     docker run --name nombreContenedorNEW -p 49160:80 -d luiisgallego/nombreImagen
     docker run --name nombreContenedorNEW -e VAR_ENTORNO=valor -p 49160:80 -d luiisgallego/nombreImagen
    ~~~
- Podemos ver que se está ejecutando bajo la instrucción que indicamos en el *Dockerfile* bajo *CMD*:
    ~~~
    docker ps -l
    ~~~
- ¿Cómo podemos ver que la ejecución de nuestra aplicación esta siendo correcta? Con la siguiente instrucción, que nos mostrará los logs que imprime nuestra app.
    ~~~
    docker logs ID_CONTENEDOR
    ~~~
- Ahora ya podemos eliminar si queremos el contenedor, parándolo primero.
    ~~~
    docker stop ID_CONTAINER
    docker rm ID_CONTAINER
    ~~~
- Podemos entrar dentro de la máquina, creando un contenedor y borrándolo en la misma orden, y ejecutar órdenes dentro de ella:
    ~~~
    docker run --rm -it luiisgallego/firstapp sh
    ~~~

Una vez que hemos creado la imagen e interactuado con el contenedor de forma local y hemos comprobado que funciona según lo previsto, podemos subir la imagen a *DockerHUB* para asi poder lanzarla en *Azure*, nuestro propósito final:

- Ya estamos listos para subirlo a nuestro repositorio de *DockerHUB*, dicho repo debe estar creado previamente, además es necesario estar logueado desde la terminal también para vincular:
    ~~~
    docker tag nombreImagen luiisgallego/nombreRepositorioDockerHub
    docker push luiisgallego/nombreRepositorioDockerHub
    ~~~
