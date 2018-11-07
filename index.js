// Creamos las dependencias
var express = require('express');
var app = express();
var items = require("./items.js");

// Variables globales
var almacenItems = new Object;
var respuesta = new Object;

var server_ip_address = '127.0.0.1'; 
app.set('puerto', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

/*

GET - LEER
POST - CAMBIA ESTADO
PUT - CREA
DELETE - BORRA

 - CABECERA => ESTADOS, CODIFICACION, CONTENT-TYPE

 INDICAR PORQUE ELEGIR EL MICROFRAMEWORK (EXPRESS)

 - DOCUMENTACION
    - PAAS => LENGUAJE DE PROGRAMACION
    - DEPENDENCIAS (BIBLIOTECAS,...) => PACKAGE.JSON EXPLICARLO 

*/

// Crea un nuevo item
app.put('/item/:nombre/:cantidad/:precio', function(req, response){
    var nuevoItem = new items.Items(req.params.nombre, req.params.cantidad, req.params.precio);
    almacenItems[nuevoItem.ID] = nuevoItem;

    respuesta = {
        "status" : "OK",
        "ejemplo" : {
            "ruta" : "/item/:nombre/:cantidad/:precio",
            "valor" : nuevoItem
        }
    };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

app.get('/', function(request, response){
    respuesta = { "status" : "OK" };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Mostramos todos los items
app.get('/item', function(request, response){

    if(JSON.stringify(almacenItems) == '{}') {    // Comprobamos si es vacio
        respuesta = { "status" : "404", "Mensaje" : "No hay Items." };
        response.status(404).type('json').send(JSON.stringify(respuesta, null, "\t")); 
    } else {
        respuesta = {
            "status" : "OK",
            "ejemplo" : {
                "ruta" : "/item",
                "valor" : almacenItems
            }
        };
        response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t")); 
    }
});

// Mostramos por ID
app.get('/item/:ID', function(request, response){

    var identificador = request.params.ID;
    
    if(!almacenItems[identificador]) {
        respuesta = { "status" : "404", "Mensaje" : "No existe ID222" };
        response.status(404).type('json').send(JSON.stringify(respuesta, null, "\t")); 
    } else {
        respuesta = {
            "status" : "OK",
            "ejemplo" : {
                "ruta" : "/item/:ID",
                "valor" : almacenItems[identificador].ID
            }
        };
        response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));      
    }
});

app.listen(app.get('puerto'), server_ip_address, function() {
    console.log("Items app corriendo en " + server_ip_address + ":" + app.get('puerto'));
  });

// Exporta la variable para poder hacer tests
module.exports = app;
