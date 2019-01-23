/****************************   APP    *****************************/

// Creamos las dependencias
var express = require('express');       // Aplicacion Web
var mongoose = require('mongoose');     // BD
var bodyParser = require("body-parser");
const { createLogger, format, transports } = require('winston'); // LOGs
const { combine, timestamp, label, printf } = format;           // Formateo de LOGs
var items = require("./items.js");      // Index
var app = express();

// Variables globales
var almacenItems = new Object;
var respuesta = new Object;

// Configuramos puertos y conexiones
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.set('puerto', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 80));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectamos la BD
var passMlab = process.env.PASSMLAB; // items1
var uri_mlab = "mongodb://items:" + passMlab + "@ds044587.mlab.com:44587/items";
//var uri_localhost = "mongodb://localhost/itemsTest"
//var uri_new_localhost = "mongodb://localhost:27017/Db";
//var uri_azure = "mongodb://10.0.0.5:27017/Db"
//var URI_mongo_mlab = uri_mlab || uri_localhost; 

var ipDB = process.env.ipDB || '10.0.0.5';
var uriDB = "mongodb://" + ipDB + ":27017/Db";

mongoose.connect(uri_mlab, { useNewUrlParser: true }, function (err, res) {
    if(err) logger.info('ERROR conectando a: ' + uri_mlab + '. ' + err);
    else logger.info('BD conectada a: ' + uri_mlab);
});

// Creamos y configuramos el sistema de logs
const formatTexto = printf(
    info => { return `${info.timestamp} ${info.level}: ${info.message}`; 
}); 
const formatTimestamp = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

const logger = createLogger({
    level: 'info',
    format: combine(
        formatTimestamp,
        formatTexto      
    ),
    transports: [
        new transports.File({ filename: 'info.log' }),
        new transports.Console(),
    ]
});

// Creamos y enlazamos el modelo de la BD
var itemsSchema = new mongoose.Schema({
    ID: { type: String },
    nombre: { type: String },
    cantidad: { type: Number },
    precio: { type: Number }
});
var itemsBD = mongoose.model('items', itemsSchema); // Exportar para test

/****************************   APP RUTAS   *****************************/

/*  "/"
 *    GET: Devolver status OK
 */
app.get('/', function(request, response){

    // Mostramos status OK
    respuesta = { "status" : "OK" };
    response.status(200).type('json').send(respuesta);
    
    var txtLog = 'GET / desde IP ' + request.connection.remoteAddress + ' con status ';
    logger.info(txtLog + 200);
});

/*  "/item/:nombre/:cantidad/:precio"
 *    PUT: Crear nuevo item.
 *    POST: Actualizar item por nombre.
 */
app.put('/item/:nombre/:cantidad/:precio', function(request, response){
    var nuevoItem = new items(request.params.nombre, request.params.cantidad, request.params.precio);
    var txtLog = 'PUT /item/:nombre/:cantidad/:precio desde IP ' + request.connection.remoteAddress + ' con status ';

    var nuevoItemBD = new itemsBD({
        ID: 'ID_' + nuevoItem.nombre,
        nombre: nuevoItem.nombre,
        cantidad: nuevoItem.cantidad,
        precio: nuevoItem.precio
    });
    
    // Comprobamos si el item existe
    itemsBD.find({ ID: nuevoItem.ID }, function(err,res) {        

        if(err || res.length != 0) {
            response.status(404).type('json').send({ txt: "Error al insertar ITEM"});         // Error BD
            logger.info(txtLog + 404);
        }
        else {      
            // Si no existe, lo creamos
            var resp;
            itemsBD.create(nuevoItemBD, function(err,res){
                if(err) {
                    response.status(404).type('json').send();       // Error BD
                    logger.info(txtLog + 404);
                }
                else {
                    response.status(200).type('json').send(res);   // Item insertado 
                    logger.info(txtLog + 200);
                }                 
            });
        }
    });
});

app.post('/item/:nombre/:cantidad/:precio', function(request, response){  
    var txtLog = 'POST /item/:nombre/:cantidad/:precio desde IP ' + request.connection.remoteAddress + ' con status ';

    var itemUpdate = {
        nombre: request.params.nombre,
        cantidad: request.params.cantidad,
        precio: request.params.precio
    };
    
    itemsBD.updateOne({ ID: "ID_" + itemUpdate.nombre }, itemUpdate, function(err,res){
        if(err) {
            response.status(404).type('json').send();       // Error BD
            logger.info(txtLog + 404);
        }
        else {
            response.status(200).type('json').send(res);   // Item insertado 
            logger.info(txtLog + 200);
        }                 
    });
});

/*  "/item"
 *    GET: Mostrar todos los items.
 */
app.get('/item', function(request, response){
    var txtLog = 'GET /item desde IP ' + request.connection.remoteAddress + ' con status ';

   itemsBD.find({}, function(err, res){
        if(err || res.length == 0) {
            response.status(404).type('json').send();       // Error BD || Item no encontrado
            logger.info(txtLog + 404);
        }
        else {
            response.status(200).type('json').send(res);    // Items encontrados
            logger.info(txtLog + 200);
        }
   });          
});

/*  "/item/:ID"
 *    GET: Mostrar item por ID.
 *    DELETE: Borrar item por ID.
 */
app.get('/item/:ID', function(request, response){
    var identificador = request.params.ID;
    var txtLog = 'GET /item/:ID desde IP ' + request.connection.remoteAddress + ' con status ';
    
    itemsBD.find({ ID: identificador }, function(err, res){
        if(err || res.length == 0) {
            response.status(404).type('json').send();       // Error || Item no existe
            logger.info(txtLog + 404);
        }
        else {
            response.status(200).type('json').send(res);    // Item encontrado 
            logger.info(txtLog + 200);
        }
   });      
});

// Borramos según ID
app.delete('/item/:ID', function(request, response){      
    var id = request.params.ID;
    var txtLog = 'DELETE /item/:ID desde IP ' + request.connection.remoteAddress + ' con status ';

    itemsBD.deleteOne({ ID: id }, function(err, res){
        if(err) {
            response.status(404).type('json').send();        // Error BD
            logger.info(txtLog + 404);
        }
        else {
            response.status(200).type('json').send();       // Item borrado 
            logger.info(txtLog + 200);
        }
    });    
});

// Lanzamos la aplicacion
if(!module.parent){ 
    app.listen(app.get('puerto'), server_ip_address, function() {
        logger.info("Items app corriendo en " + server_ip_address + ":" + app.get('puerto'));        
    });
}

// Exporta la variable para poder hacer tests
module.exports = app;
