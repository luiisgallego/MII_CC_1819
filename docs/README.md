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

Dentro de la variedad de Plataformas como Servicio que nos permita construir, ejecutar y operar nuestra aplicación he elegido Heroku. Su sencillez en el despliegue y el servicio gratuito que nos ofrece han sido cuestiones de peso para su elección. Además, su integración con Github y Travis es vital para el desarrollo del proyecto. Concretamente para que Heroku pueda encontrar el archivo principal de mi proyecto he tenido que crear un archivo denominado Procfile que contiene la siguiente instrucción:
~~~
web: node index.js 
~~~
Como vemos en la instruccion anterior estamos trabajando con Node.js. Para hacer uso de el hay que apoyarse en su gestor de paquetes, npm. Este me ha proporcionado las diferentes dependencias necesarias para la ejecución de mi proyecto, siendo estas las siguientes:
~~~
"dependencies": {
    "express": "^4.16.4",
    "express-favicon": "^2.0.1",
    "mocha": "^5.2.0",
    "should": "^13.2.3",
    "supertest": "^3.3.0"
},
"devDependencies": {
    "nyc": "^13.1.0"
}
~~~

# Despliegue

### Rutas

### Ejecución

 Para el correcto despliegue del proyecto vamos a seguir los siguientes pasos:
 - Clonamos el proyecto de Github
 ~~~
 git clone https://github.com/luiisgallego/MII_CC_1819.git
 ~~~
 - Accedemos a la carpeta creada tras el clone:
 ~~~
 cd MII_CC_1819
 ~~~
 - Ahora tendriamos que instalar npm en el caso de que no lo tuvieramos anteriormente, esto depende del sistema operativo.
 - Una vez instalado npm podemos pasar a instalar las distintas dependencias del proyecto:
 ~~~
 npm install
 ~~~
- Ahora ya podemos comprobar que nuestro proyecto es funcional pasando sus tests correspondientes:
 ~~~
 npm test
 ~~~ 

Llegado a este punto se nos abre un abanico de posibilidades, podemos trabajar en el proyecto tanto en local como en el despliegue de Heroku. Primero vamos a comentar como trabajar en local:
- Primero vamos a desplegar nuestro proyecto:
    - Prueba
 ~~~
 npm start
 ~~~ 

- Podemos trabajar con curl realizando tanto PUT como POST o DELETE, también


 - autoTest.sh => Explicar como hacerlo funcionar

 - Enlace despliegue

### Licencia

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0
