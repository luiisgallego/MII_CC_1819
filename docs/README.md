# MII_CC_1819

Proyecto de prácticas para la asignatura Cloud Computing del Máster en Ingeniería Informática.

### Autor: Luis Gallego Quero

# Proyecto a desarrollar

Módulo para la gestión de contabilidad de una empresa.

### Descripción

Tras la realización de un ERP que posibilitaba la gestión de las tareas de documentación de una PYME, ha llegado el momento de ampliar su funcionalidad con la inserción de un módulo de contabilidad. Este módulo se ubica dentro de un proyecto mayor destinado a un futuro TFM, en el cual se reconstruirá el backend de dicho ERP evolucionando hacia una arquitectura basada en microservicios. 

Este módulo nos permitirá tener una primera versión de un inventario de productos, culminando en la gestión del balance económico final de la empresa.

### Descripción del problema

En el desarrollo de contabilidad de una empresa hay gran cantidad de variables que controlar, desde la compra de inventario básico a una fábrica, su posterior venta con los beneficios obtenidos pasando por el gasto diario que se genera en la empresa y un largo etcetera.

Con la realización de este módulo llegaremos a establecer una primera versión que controle el anterior problema. Para ello nos centraremos en desarrollar un sistema que nos permita introducir los datos cliente junto con la información de los items de la factura y su precio, generando el documento final correspondiente. 

# Tecnologías del proyecto

### Arquitectura

Para evolucionar el ERP y desarrollo de la asignatura utilizaremos una arquitectura basada en microservicios. Una de las razones fundamentales es que el proyecto inicial nació para estar en la web y ser usado por diferentes usuarios a la vez, de esta manera, con los microservicios podremos mantener un sistema estable y bien escalado.

Además, es una evolución lógica ya que el ERP inicial está basado en un arquitectura monolítica, concretamente MVC, la cual se volvió incosistente y difícilmente escalable.

### Microservicios

Como microservicios a desarrollar encontramos los siguientes:

- Lectura de datos. Esta lectura se generará desde un formulario en el caso de crear una interfaz o desde un archivo JSON, estableciendo dichos datos previamente. 
- Gestión de datos en la base de datos.
- Generación de la factura.
- Escritura en un log de los procesos generados en el sistema.

### Back-end

Para su implementación usaremos como lenguaje principal Node.js bajo el framework Express.js. Como base de datos, MongoDB. Además, nos basaremos en un desarrollo mediante test, usando para ello Travis-CI. El nexo de unión entre los distintos microservicios será llevado a cabo mediante el broker RabbitMQ.

Finalmente, indicar que utilizaremos como contenedor Docker y como plataforma de despliegue Heroku.

# PaaS

Dentro de la variedad de *Plataformas como Servicio* que nos permita construir, ejecutar y operar nuestra aplicación he elegido *Heroku*. Su sencillez en el despliegue y el servicio gratuito que nos ofrece han sido cuestiones de peso para su elección. Además, su integración con *Github* y *Travis* es vital para el desarrollo del proyecto. Concretamente para que *Heroku* pueda encontrar el archivo principal de mi proyecto he tenido que crear un archivo denominado *Procfile* que contiene la siguiente instrucción:
~~~
web: node index.js 
~~~
El despligue en Heroku es bastante sencillo, una vez definido el *Procfile* el siguiente paso es crearnos nuestro proyecto en la plataforma de Heroku, para ello inicialmente hacemos:
~~~
heroku create
~~~
Posteriormente accedemos a nuestro proyecto en la página de Heroku y activamos el despligue con Gitub. Es importante activar el despliegue automático, además de marcar la opción de que pase el CI antes de desplegar (así esperará a que Travis pase los tests antes de desplegarse en Heroku). Llegados a este punto ya podemos desplegar nuestra aplicación al completo en Heroku:
~~~
git push heroku master
~~~

Como vemos en la primera instruccion anterior estamos trabajando con *Node.js*. Para hacer uso de el hay que apoyarse en su gestor de paquetes, *npm*. Este me ha proporcionado las diferentes dependencias necesarias para la ejecución de mi proyecto, siendo estas las siguientes:
~~~
"dependencies": {
    "express": "^4.16.4",
    "mocha": "^5.2.0",
    "should": "^13.2.3",
    "supertest": "^3.3.0"
},
"devDependencies": {
    "nyc": "^13.1.0"
}
~~~

En resumen estamos utilizado *Express* como microframework, *Mocha*, *Should* y *Supertest* para los tests y *Nyc* para mostrar la cobertura de dichos tests.

### Datos Aplicación

Para terminar este apartado, comentar la estructura de datos que he utilizado en mi proyecto, sin la que todo lo anterior no tendría nada para funcionar.

Se ha construido una clase de Items con los siguientes datos:
- ID: Como identificador único de cada item.
- Nombre: Nombre del item.
- Cantidad: Numero de items que tenemos.
- Precio: Precio de cada item.

Esta clase de Items es utilizada por *index.js* para realizar los 4 verbos de Http, declando previamente un objeto que funciona como vector almacén de Items, denominado *almacenItems*.

# Despliegue

### Rutas

Para la transferencia de datos en nuestro proyecto se ha seguido el método estandarizado actualmente, siendo este el uso de una *API REST*. Para ello se han utilizado los 4 verbos de Http indicando en cada uno de ellos las rutas de ejecución. Los métodos que podemos encontrar en mi aplicación son los siguientes:
- PUT: Añadimos nuevo item.
    - /item/:nombre/:cantidad/:precio
- POST: Actualizo información de un item.
    - /item/:nombre/:cantidad/:precio
- DELETE: Borro un item.
    - /item/:ID
- GET: Consulto información del item.
    - Muestro status ok al entrar a la aplicación.
        - /
    - Muestro todos los items.
        - /item
    - Muestro la información de un item por su ID.
        - /item/:ID

### Ejecución

Para el correcto despliegue del proyecto vamos a seguir los siguientes pasos:
 - Clonamos el proyecto de *Github*:
    ~~~
    git clone https://github.com/luiisgallego/MII_CC_1819.git
    ~~~
 - Accedemos a la carpeta creada tras el clone:
    ~~~
    cd MII_CC_1819
    ~~~
 - Ahora tenemos que instalar *npm* (gestor de paquetes) en el caso de que no lo tuvieramos anteriormente, esto depende del sistema operativo.
 - Una vez instalado *npm* podemos pasar a instalar las distintas dependencias del proyecto:
    ~~~
    npm install
    ~~~
- Ya podemos comprobar que nuestro proyecto es funcional pasando sus tests correspondientes:
    ~~~
    npm test
    ~~~ 

Llegado a este punto se nos abren varias posibilidades, podemos trabajar en el proyecto tanto en local como en el despliegue de Heroku. Primero vamos a comentar como trabajar en *local*:
- Ejecución y test en *local*:
    - Primero levantamos nuestra aplicación:
        ~~~
        npm start
        ~~~
    - Podemos ver la página inicial de la aplicación en el navegador en la siguiente dirección:
        ~~~
        http://localhost:5000/
        ~~~
    - Ahora de nuevo tenemos varias posibilades:
        - Ejecutar un script auxiliar que realiza tanto inserciones, como actualizaciones, borrados y consultas (posiblemente tengas que dar permisos de ejecución al script):
            ~~~
            ./autoTest.sh
            ~~~
        - Realizar lo mismo que el *autoTest* pero manualmente. Para ello usamos *curl*, siendo algunos ejemplos los siguientes:
            ~~~
            curl -X PUT "http://localhost:5000/item/prueba10/1/100"
            curl "http://localhost:5000/item"
            curl "http://localhost:5000/item/ID_prueba10"
            curl -X POST "http://localhost:5000/item/prueba10/15/150"
            curl -X DELETE "http://localhost:5000/item/ID_prueba10"
            ~~~

- Ejecución y test en la aplicación desplegada en *Heroku*:
    El funcionamiento es el mismo que en *local*, tan solo que en este caso hay que sustituir *http://localhost:5000* por la dirección de la aplicación desglegada *https://itemsv1.herokuapp.com*. En este caso no hay levantarla. Si queremos hacer uso de *autoTest* ejecutar de la siguiente manera:
    ~~~
    ./autoTest.sh https://itemsv1.herokuapp.com
    ~~~

Para terminar, podemos encontrar la aplicación desplegada en el [despliegue](https://itemsv1.herokuapp.com/).

### Licencia

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0
