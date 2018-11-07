var express = require('express');
var app = express();
var items = require("./items.js");

var almacenItems = new Object;
var respuesta = new Object;

var server_ip_address = '127.0.0.1'; 
app.set('puerto', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Crea un nuevo item
app.put('/item/:nombre/:cantidad/:precio', function(req, response){
    var nuevoItem = new items.Items(req.params.nombre, req.params.cantidad, req.params.precio);
    almacenItems[nuevoItem.ID] = nuevoItem;
    response.status(200).send(nuevoItem);
    //console.log("Ejecutado");
});

// Mostramos todos los items
app.get('/item', function(request, response){
    response.send(almacenItems)
});

// Mostramos por ID
app.get('/item/:ID', function(request, response){

    var identificador = request.params.ID;
    
    if(!almacenItems[identificador]) {
        respuesta = { "status" : "404", "Mensaje" : "No existe ID" };
        response.status(404).type('json').send(JSON.stringify(respuesta, null, "\t")); 
    } else {
        respuesta = {
            "status" : "200",
            "respuesta" : {
                "ruta" : "/item/" + almacenItems[identificador].ID,
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