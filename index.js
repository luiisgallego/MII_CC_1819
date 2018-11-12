// Creamos las dependencias
var express = require('express');
var app = express();
var items = require("./items.js");

// Variables globales
var almacenItems = new Object;
var respuesta = new Object;
var valor = new Object;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.set('puerto', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Crea un nuevo item
app.put('/item/:nombre/:cantidad/:precio', function(request, response){
    var nuevoItem = new items(request.params.nombre, request.params.cantidad, request.params.precio);
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

        // Si existe, no insertamos y devolvemos mensaje
        if(existe) valor = "ITEM ya existe";
        else {
            // Si no existe aun, lo insertamos
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

// Mostramos status OK
app.get('/', function(request, response){
    respuesta = { "status" : "OK MEN" };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});

// Mostramos todos los items
app.get('/item', function(request, response){

    // Comprobamos si es aun no hay ninguno 
    if(JSON.stringify(almacenItems) == '{}') valor = "No hay Items.";    
    else valor = almacenItems;

    respuesta = {
        "status" : "OK",
        "ejemplo" : {
            "ruta" : "/item",
            "valor" : valor
        }
    };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));     
});

// Mostramos por ID todos los datos del item
app.get('/item/:ID', function(request, response){
    var identificador = request.params.ID;
    
    // Comprobamos que existe
    if(!almacenItems[identificador]) valor = "ITEM no existe";
    else valor = almacenItems[identificador];

    respuesta = {
        "status" : "OK",
        "ejemplo" : {
            "ruta" : "/item/:ID",
            "valor" : valor
        }
    };   
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));    
});

app.listen(app.get('puerto'), server_ip_address, function() {
    console.log("Items app corriendo en " + server_ip_address + ":" + app.get('puerto'));
});

// Exporta la variable para poder hacer tests
module.exports = app;
