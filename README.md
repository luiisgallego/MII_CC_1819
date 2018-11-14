# MII_CC_1819

[![Build status](https://travis-ci.com/luiisgallego/MII_CC_1819.svg?branch=master)](https://travis-ci.com/luiisgallego/MII_CC_1819)

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

Utilizaremos una arquitectura basada en microservicios. 

### Microservicios

Como microservicios a desarrollar encontramos los siguientes:

- Lectura de datos. 
- Gestión de datos en la base de datos.
- Generación de la factura.
- Escritura en un log de los procesos generados en el sistema.

### Back-end

- Lenguaje principal Node.js bajo el framework Express.js. 
- Base de datos, MongoDB. 
- Test, usando para ello Travis-CI. 
- Unión entre los distintos microservicios será llevado a cabo mediante el broker RabbitMQ.
- Contenedor Docker. 
- Plataforma de despliegue Heroku.

# Despligue

Podemos ver el proyecto desplegado pinchando [aquí](https://itemsv1.herokuapp.com/). Si queremos obtener más información sobre el despligue, pruebas y diferentes rutas del proyecto: 
Despligue: https://luiisgallego.github.io/MII_CC_1819/

### Licencia

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0

### Más información

Se puede consultar la información completa del proyecto [aquí](https://luiisgallego.github.io/MII_CC_1819/).

