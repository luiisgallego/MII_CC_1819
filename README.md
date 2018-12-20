# MII_CC_1819

[![Build status](https://travis-ci.com/luiisgallego/MII_CC_1819.svg?branch=master)](https://travis-ci.com/luiisgallego/MII_CC_1819)

Proyecto de prácticas para la asignatura Cloud Computing del Máster en Ingeniería Informática.

### Autor: Luis Gallego Quero

# Proyecto a desarrollar

Módulo para la gestión de contabilidad de una empresa.

### Listado de Apartados

- [Descripción](#descripcion)
    - [Descripcion del problema](#descipcion_problema)
- [Tecnologías del proyecto](#tecnologias)
    - [Arquitectura](#arquitectura)
    - [Microservicios](#microservicios)
    - [Back-end](#back_end)
- [Despligue](#despligue)
- [Provision](#provision)
- [Automatización](#automatizacion)
- [Licencia](#licencia)

### Descripción <a name="descripcion"></a>

Tras la realización de un ERP que posibilitaba la gestión de las tareas de documentación de una PYME, ha llegado el momento de ampliar su funcionalidad con la inserción de un módulo de contabilidad. Este módulo se ubica dentro de un proyecto mayor destinado a un futuro TFM, en el cual se reconstruirá el backend de dicho ERP evolucionando hacia una arquitectura basada en microservicios. 

Este módulo nos permitirá tener una primera versión de un inventario de productos, culminando en la gestión del balance económico final de la empresa.

### Descripción del problema <a name="descipcion_problema"></a>

En el desarrollo de contabilidad de una empresa hay gran cantidad de variables que controlar, desde la compra de inventario básico a una fábrica, su posterior venta con los beneficios obtenidos pasando por el gasto diario que se genera en la empresa y un largo etcetera.

Con la realización de este módulo llegaremos a establecer una primera versión que controle el anterior problema. Para ello nos centraremos en desarrollar un sistema que nos permita introducir los datos cliente junto con la información de los items de la factura y su precio, generando el documento final correspondiente. 

# Tecnologías del proyecto <a name="tecnologias"></a>

### Arquitectura <a name="arquitectura"></a>

Utilizaremos una arquitectura basada en microservicios. 

### Microservicios <a name="microservicios"></a>

Como microservicios a desarrollar encontramos los siguientes:

- Lectura de datos. 
- Gestión de datos en la base de datos.
- Generación de la factura.
- Escritura en un log de los procesos generados en el sistema.

### Back-end <a name="back_end"></a>

- Lenguaje principal Node.js bajo el framework Express.js. 
- Base de datos, MongoDB. 
- Test, usando para ello Travis-CI. 
- Unión entre los distintos microservicios será llevado a cabo mediante el broker RabbitMQ.
- Contenedor Docker. 
- Plataforma de despliegue Heroku.

# Despligue <a name="despliegue"></a>

Podemos ver el proyecto desplegado pinchando [aquí](https://itemsv1.herokuapp.com/). Si queremos obtener más información sobre el despligue, pruebas y diferentes rutas del proyecto: 
Despliegue: https://itemsv1.herokuapp.com/

# Provision <a name="provision"></a>

MV: 13.82.132.92

Para el provisionamiento de la aplicación hemos optado por [Ansible](https://www.ansible.com/). Nos hemos decantado por esta herramienta por la sencillez para crear y entender los playbook mediante el lenguaje *YAML*. Además, la gestión de la configuración de diferentes máquinas, y su integración con Azure o Amazon es clave para el desarrollo de nuestra aplicación. Como sistemas operativos que usan nuestras máquinas usamos los siguientes:

- La máquina anfitriona usa Mac OS Mojave.
- La maquina virtual usa Ubuntu Server 14.04 LTS desplegada en Azure. Hemos elegido usar *Ubuntu* ya que en su versión mínima, server, permite utilizar todos los recursos hardware de una manera óptica y podría estar durante años sin presentar problemas. Su adquisición es barata y cuenta con una buena seguridad. En definitiva, contiene todo lo neceasario para desplegar un sistema que trabaje indefinidamente en la nube.

Para el aprovisionamiento usando *Ansible* y documentación detallada, podemos consultar todos los detalles [aquí](https://github.com/luiisgallego/MII_CC_1819/blob/master/provision).

# Automatización de la creación de máquinas virtuales desde línea de órdenes <a name="automatizacion"></a>

MV2: 51.140.14.158

Para la realización de la automatización de nuestro proyecto en un sistema Cloud se ha creado un script. Este hace uso del cliente de líneas de órdenes de *Azure*, sistema Cloud elegido, y nos proporciona una máquina virtual totalmente lista para provisionar con *Ansible* y disponer de nuestro proyecto completamente funcional. 

Todo el proceso seguido para su realización lo podemos encontrar [aquí](https://github.com/luiisgallego/MII_CC_1819/blob/master/docs/automaticacionMV.md).

Además, como avance del proyecto se ha creado un sistema de *logs*. Podemos encontrar toda la información [aquí](https://github.com/luiisgallego/MII_CC_1819/blob/master/docs/logs.md).

### Licencia <a name="licencia"></a>

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0

### Más información

Se puede consultar la información completa del proyecto [aquí](https://luiisgallego.github.io/MII_CC_1819/).

