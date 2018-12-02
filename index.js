// Creamos las dependencias
var express = require('express');
//var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var items = require("./items.js");
var app = express();

// Variables globales
var almacenItems = new Object;
var respuesta = new Object;
// Var globales BD_Mongo.db
//var ObjectID = mongodb.ObjectID;
//var _ITEMS_ = "items";
//var db; // Global para ser utilizada por todas las rutas

var URI_mongo_mlab = "mongodb://items:items1@ds044587.mlab.com:44587/items" || "mongodb://localhost/itemsTest";

// Configuramos puertos y conexiones
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.set('puerto', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000));
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

// Lanzamos la BD y lanzamos aplicación
mongoose.connect(URI_mongo_mlab, { useNewUrlParser: true }, function (err, res) {
    if(err) console.log('ERROR conectando a: ' + URI_mongo_mlab + '. ' + err);
    else console.log ('BD conectada a: ' + URI_mongo_mlab);
});

var itemsSchema = new mongoose.Schema({
    ID: { type: String },
    nombre: { type: String },
    cantidad: { type: Number },
    precio: { type: Number }
});

var itemsBD = mongoose.model('items', itemsSchema); // Exportar para test

app.put('/item/:nombre/:cantidad/:precio', function(request, response){
    var nuevoItem = new items(request.params.nombre, request.params.cantidad, request.params.precio);
    var existe = false;

    var nuevoItemBD = new itemsBD({
        ID: 'probando',
        nombre: nuevoItem.nombre,
        cantidad: nuevoItem.cantidad,
        precio: nuevoItem.precio
    });

    /*// Verificamos que no exista el item 
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
    }*/

    nuevoItemBD.save(function(err){
        if(err) console.log("Error inserción.");
        else {
            response.status(200).type('json').send(JSON.stringify(nuevoItemBD, null, "\t"));
        }
    });

    //response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});



// Mostramos status OK
app.get('/', function(request, response){
    respuesta = { "status" : "OK" };
    response.status(200).type('json').send(JSON.stringify(respuesta, null, "\t"));
});



// Mostramos todos los items
app.get('/item', function(request, response){


    /*
    if(JSON.stringify(almacenItems) == '{}') response.status(404).type('json').send();    
    else response.status(200).type('json').send(JSON.stringify(almacenItems, null, "\t")); 
    */


   itemsBD.find({ ID: 'probando' }).lean().exec( function(err, items2){
        if(err) response.status(404);
        else {
            console.log(items2[0].ID);
            //response.status(200);
            response.status(200).type('json').send(items2);
        }
   });
       
});



// Mostramos por ID todos los datos del item
app.get('/item/:ID', function(request, response){
    var identificador = request.params.ID;
    
    // Comprobamos que existe
    if(!almacenItems[identificador]) response.status(404).type('json').send();
    else response.status(200).type('json').send(JSON.stringify(almacenItems[identificador], null, "\t"));   
});

// Lanzamos la aplicacion
app.listen(app.get('puerto'), server_ip_address, function() {
    console.log("Items app corriendo en " + server_ip_address + ":" + app.get('puerto'));
});

// Exporta la variable para poder hacer tests
module.exports = app;
//module.exports = itemsBD;
