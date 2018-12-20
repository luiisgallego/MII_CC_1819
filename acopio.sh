#!/bin/bash

# Definimos variables
nombreGrupoRecursos="Hito4_Subs2"
localizacion="uksouth"
nombreUser="luis"
nombreMV="ubunbuCC4"
imagen="Canonical:UbuntuServer:16.04-LTS:latest"
tamDisco="Standard_A1_v2"

# Medimos el tiempo al inicio
start=`date +%s`

# Creamos el grupo de recursos en función de la localizacion
echo "Creamos grupo de recursos...."
az group create --name $nombreGrupoRecursos --location $localizacion 
echo "Grupo de recursos creado."

# Creamos la MV sobre el grupo de recursos creado previamente con:
# nombre de la MV, tipo de imagen, nombre de usuario, tamaño del disco e IP publica estática.
echo "Creamos MV con nombre usuario, imagen concreta, tamaño e IP estatica...."
az vm create \
    --resource-group $nombreGrupoRecursos \
    --name $nombreMV \
    --image $imagen \
    --admin-username $nombreUser \
    --size $tamDisco
    --public-ip-address-allocation static 

echo "Creada MV al completo."

# Abrimos el puerto 80 para hacer uso de HTTP
echo "Abrimos puerto 80..."
az vm open-port --resource-group $nombreGrupoRecursos --name $nombreMV --port 80 
echo "Puerto abierto!"
echo "Acopio finalizado."

# Medimos el tiempo al final
end=`date +%s`
tiempoTotal=$((end-start))
echo "Tiempo total: $tiempoTotal segundos."