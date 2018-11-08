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
 - CABECERA => ESTADOS, CODIFICACION, CONTENT-TYPE

 INDICAR PORQUE ELEGIR EL MICROFRAMEWORK (EXPRESS)

 - DOCUMENTACION
    - PAAS => LENGUAJE DE PROGRAMACION
    - DEPENDENCIAS (BIBLIOTECAS,...) => PACKAGE.JSON EXPLICARLO 
*/

// Crea un nuevo item
app.put('/item/:nombre/:cantidad/:precio', function(request, response){
    var nuevoItem = new items.Items(request.params.nombre, request.params.cantidad, request.params.precio);
    var valor;
    var existe = false;

    // Verificamos que no exista el item 
    if(JSON.stringify(almacenItems) == '{}') { // Si es vacio el array de items, insertamos
        almacenItems[nuevoItem.ID] = nuevoItem;
        valor = nuevoItem;
    } else{
        // Comprobamos si el item ya existe
        for(var clave in almacenItems) {
            if(almacenItems[clave].nombre == request.params.nombre) existe = true;
        }

        if(existe) {
            // Si existe, no insertamos y devolvemos mensaje
            valor = "ITEM ya existe";
        } else {
            // Si no existe aun lo insertamos
            almacenItems[nuevoItem.ID] = nuevoItem;
            valor = nuevoItem;
        }
    }

    respuesta = {
        "status" : "OK",
        "ejemplo" : {
            "ruta" : "/item/:nombre/:cantidad/:precio",
            "valor" : valor
        }
    };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Actualizamos en funcion del nombre
app.post('/item/:nombre/:cantidad/:precio', function(request, response){
    var valor;
    var existe = false;    
    
    // Buscamos el item 
    for(var clave in almacenItems) {
        if(almacenItems[clave].nombre == request.params.nombre) {
            // Si existe, actualizamos los valores
            var auxClave = clave;
            existe = true;
            almacenItems[clave].cantidad = request.params.cantidad;
            almacenItems[clave].precio = request.params.precio;
        } 
    }

    // Si existe, lo mostramos modificado, sino, mensaje de error.
    if(existe) valor = almacenItems[auxClave];
    else valor = "ITEM no existe";

    respuesta = {
        "status" : "OK",
        "ejemplo" : {
            "ruta" : "/item/:nombre/:cantidad/:precio",
            "valor" : valor
        }
    };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Borramos según ID
app.delete('/item/:ID', function(request, response){      
    var id = request.params.ID;
    var valor;
    console.log("ESTAMOS EN DELETE: " + almacenItems[id]);

    // Si no existe item, mensaje de error
    if(JSON.stringify(almacenItems[id]) == undefined) valor = "ITEM no existe";
    else {
        // Borramos y mostramos los items
        delete almacenItems[id];
        valor = almacenItems;
    }       

    respuesta = {
        "status" : "OK",
        "ejemplo" : {
            "ruta" : "/item/:ID",
            "valor" : valor
        }
    };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

app.get('/', function(request, response){
    respuesta = { "status" : "OK" };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

/////////////////

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
                "valor" : almacenItems,
                "keys": Object.keys(almacenItems),
                "long": Object.keys(almacenItems).length
            }
        };
        response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t")); 
    }
});

// Mostramos por ID
app.get('/item/:ID', function(request, response){

    var identificador = request.params.ID;
    
    if(!almacenItems[identificador]) {
        respuesta = { "status" : "404", "Mensaje" : "No existe ID" };
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

// Mostramos por NOMBRE
app.get('/item/X/:nombre', function(request, response){

    var nombre = request.params.nombre;
    var itemx = new Object; 

    for(var clave in almacenItems) {
        if(almacenItems[clave].nombre == nombre) {
            itemx = almacenItems[clave];
        }
    }
    
    if(JSON.stringify(itemx) == '{}') {
        respuesta = { "status" : "404", "Mensaje" : "No existe item." };
        response.status(404).type('json').send(JSON.stringify(respuesta, null, "\t")); 
    } else {
        respuesta = {
            "status" : "OK",
            "ejemplo" : {
                "ruta" : "/item/X/:nombre",
                "valor" : itemx
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
