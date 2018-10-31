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

Con la realización de este módulo llegaremos a establecer una primera versión que controle el anterior problema. 

# Tecnologías del proyecto

### Arquitectura

Para evolucionar el ERP y desarrollo de la asignatura utilizaremos una arquitectura basada en microservicios. Una de las razones fundamentales es que el proyecto inicial nació para estar en la web y ser usado por diferentes usuarios a la vez, de esta manera, con los microservicios podremos mantener un sistema estable y bien escalado.

En principio, se implementará un microservicio para el insertado/borrado de los elementos del inventario. Otro microservicio para la generación de facturas en función de los servicios prestados y los elementos del inventario vendidos. Finalmente se podría implementar también un microservicio que genere balances tanto semanales como mensuales.

### Microservicios (LISTADO)

- Leer datos (formulario o JSON)
- BD
- Documento
- Todos los microservicios tienen que ser pasados a un log y al broker (nexo de unión - conexion de microservicios) RabbitMQ


- Desarollo lógico:
	- Entrada de datos (Formulario) => Datos cliente e items vendidos
		- Diferenciación entre solo almacenar datos o generar documento
	- Inserción de datos en una BD => Datos cliente
	- Mensaje de okey o generación de documento


### Back-end
Para su implementación usaremos Node.js bajo el framework Express.js y como base de datos, MongoDB.

- Lenguaje principal y framework
- BD
- Test (Travis-CI)

- Despligue: 
	- Contenedor: Docker
	- Plataforma de despligue: Heroku?


### Licencia

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0
