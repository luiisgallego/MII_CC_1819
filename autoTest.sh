#!/bin/bash

if [[ "${URL}" == "" ]]; then
    URL="http://localhost:5000"
fi

echo "Arranca AUTO_TEST."
echo "Creamos ITEMs:"
curl -X PUT "${URL}/item/prueba1/1/100"
curl -X PUT "${URL}/item/prueba2/2/200"
curl -X PUT "${URL}/item/prueba3/3/300"

echo -e "\n\nRealizamos consultas."
echo "Mostramos ITEMs:"
curl "${URL}/item"
echo -e "\n\nMostramos ID:"
curl "${URL}/item/ID_prueba1"
echo -e "\n\nMostramos NOMBRE:"
curl "${URL}/item/X/prueba1"

echo -e "\n\nCOMENZAMOS PROCESO BORRADO"
echo -e "\n\nBorramos item 3:"
curl -X DELETE "${URL}/item/ID_prueba3"
echo -e "\n\nFIN PROCESO BORRADO"

echo "\n\nMostramos ITEMs:"
curl "${URL}/item"

echo -e "\n\nFIN."
