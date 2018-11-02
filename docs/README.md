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

### Licencia

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0
