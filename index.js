// Creamos las dependencias
var express = require('express');
var app = express();
var items = require("./items.js");

// Variables globales
var almacenItems = new Object;
var respuesta = new Object;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.set('puerto', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 80));
app.use(express.static(__dirname + '/public'));

// Crea un nuevo item
app.put('/item/:nombre/:cantidad/:precio', function(request, response){
    var nuevoItem = new items(request.params.nombre, request.params.cantidad, request.params.precio);
    var existe = false;

    // Verificamos que no exista el item 
    if(JSON.stringify(almacenItems) == '{}') { // Si es vacio el array de items, insertamos
        almacenItems[nuevoItem.ID] = nuevoItem;
        respuesta = nuevoItem;
    } else{
        // Comprobamos si el item ya existe
        for(var clave in almacenItems) {
            if(almacenItems[clave].nombre == request.params.nombre) existe = true;
        }

        // Si existe, no insertamos y devolvemos mensaje
        if(existe) respuesta = "ITEM ya existe";
        else {
            // Si no existe aun, lo insertamos
            almacenItems[nuevoItem.ID] = nuevoItem;
            respuesta = nuevoItem;
        }
    }

    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Actualizamos en funcion del nombre
app.post('/item/:nombre/:cantidad/:precio', function(request, response){
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
    if(existe) respuesta = almacenItems[auxClave];
    else respuesta = "ITEM no existe"; 

    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Borramos según ID
app.delete('/item/:ID', function(request, response){      
    var id = request.params.ID;
    var existe = false;

    // Si no existe item, 404
    if(JSON.stringify(almacenItems[id]) == undefined){
        response.status(404).type('json').send();        
    } else {
        // Borramos y mostramos los items
        delete almacenItems[id];
        response.status(200).type('json').send();
    } 
});

// Mostramos status OK
app.get('/', function(request, response){
    respuesta = { "status" : "OK" };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Mostramos todos los items
app.get('/item', function(request, response){

    // Comprobamos si aun no hay ninguno 
    if(JSON.stringify(almacenItems) == '{}') response.status(404).type('json').send();    
    else response.status(200).type('json').send(JSON.stringify(almacenItems, null, "\t")); 

        
});

// Mostramos por ID todos los datos del item
app.get('/item/:ID', function(request, response){
    var identificador = request.params.ID;
    
    // Comprobamos que existe
    if(!almacenItems[identificador]) response.status(404).type('json').send();
    else response.status(200).type('json').send(JSON.stringify(almacenItems[identificador], null, "\t"));   
});

app.listen(app.get('puerto'), server_ip_address, function() {
    console.log("Items app corriendo en " + server_ip_address + ":" + app.get('puerto'));
});

// Exporta la variable para poder hacer tests
module.exports = app;

