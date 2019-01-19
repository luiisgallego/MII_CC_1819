# Comprobación a **[@luiisgallego](https://github.com/luiisgallego/MII_CC_1819)** del Hito 5

**Comprobación realizada por Gema Correa ([@Gecofer](https://github.com/Gecofer/proyecto-CC))**

## Proceso de comprobación

En primer lugar se ha realizado un `fork` del repositorio y se ha clonado dicho fork a mi disco local.

![](images/orquestacion/comprobacion/1_clone.png)

A continuación, nos situamos en el directorio de _orquestacion_ y lanzamos `vagrant up --no-parallel` para crear las dos máquinas virtuales. Podemos ver que la creación y el aprovisionamiento se ha realizado con éxito para la primera máquina.

![](images/orquestacion/comprobacion/2_mv1.png)

Podemos ver que la creación y el aprovisionamiento se ha realizado con éxito para la segunda máquina, también.

![](images/orquestacion/comprobacion/3_mv2.png)

Una vez que tenemos ambas máquinas creadas, nos dirigimos a Azure, y comprobamos que efectivamente están.

![](images/orquestacion/comprobacion/4_azureMaquinas.png)

Accedemos a la máquina 2, la que dispone de la base de datos (mongo) con:

~~~
$ ssh vagrant@ccdbmongo.uksouth.cloudapp.azure.com
~~~

![](images/orquestacion/comprobacion/5_SSHMaquina2.png)

Y en dicha máquina lanzamos mongo (`sudo mongod`) y esperamos hasta que esté listo para escuchar (tarda unos minutos). Obtendremos una salida como la siguiente:

![](images/orquestacion/comprobacion/6_lanzarMongo.png)


Una vez que tenemos la máquina funcionando, pasamos a la máquina principal, en donde accedemos con:

~~~
$ ssh vagrant@ccappitems.uksouth.cloudapp.azure.com
~~~

![](images/orquestacion/comprobacion/7_SSHMaquina1.png)

Una vez dentro de ella, ya solo nos queda lanzar el proyecto con `sudo npm start`:

![](images/orquestacion/comprobacion/8_lanzarApp.png)

Obtenemos la IP de la máquina en Azure y comprobamos:

![](images/orquestacion/comprobacion/9_datosMaquina1.png)

![](images/orquestacion/comprobacion/10_probandoStatus.png)
![](images/orquestacion/comprobacion/11_comprobandoStatusTerminal.png)

Entonces podemos concluir que **LA ORQUESTACIÓN DE MÁQUINAS VIRTUALES SE HA REALIZADO CON ÉXITO**.
