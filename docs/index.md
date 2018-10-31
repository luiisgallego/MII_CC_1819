# MII_CC_1819

Proyecto de prácticas para la asignatura Cloud Computing del Máster en Ingeniería Informática.

### Autor: Luis Gallego Quero

# Proyecto a desarrollar

Módulo para la gestión de contabilidad de una empresa.

### Descripción

Tras la realización de un ERP que gestionaba diferentes tareas sobre diversos documentos de una empresa, ha llegado el momento de ampliar su funcionalidad con la inserción de un módulo de contabilidad. Este permitirá tener un inventario de productos, y en función de ello y de los servicios prestados por la empresa, gestionar el balance económico final.

# Tecnologías del proyecto

### Arquitectura

Utilizaremos una arquitectura basada en microservicios. Una de las razones fundamentales es que el proyecto inicial nació para estar en la web y ser usado por diferentes usuarios, de esta manera, con los microservicios podremos mantener un sistema estable y bien escalado.

En principio, se implementará un microservicio para el insertado/borrado de los elementos del inventario. Otro microservicio para la generación de facturas en función de los servicios prestados y los elementos del inventario vendidos. Finalmente se podría implementar también un microservicio que genere balances tanto semanales como mensuales.

### Back-end
Para su implementación usaremos Node.js bajo el framework Express.js y como base de datos, MongoDB.

### Licencia

Este proyecto se encuentra bajo la licencia GNU General Public License v3.0
