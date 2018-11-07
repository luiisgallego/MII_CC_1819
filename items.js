// Definición de la clase Items: 
//
//    var item = new Items(nombre,cantidad,precio);
//
//* `nombre` = nombre item
//* `cantidad` = numero de items
//*  `precio` = valor

// CONTIENE LA LÓGICA DE NEGOCIO - DATOS CON LOS QUE TRABAJO

exports.Items = function(nombre, cantidad, precio){
    this.ID = creaID(nombre);
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;    
    //this.items = new Object;
}

function vars(){
    return ['nombre', 'cantidad', 'precio'];
}

function getID() {
    return this.ID;
}

function creaID(nombre){
    return "ID_" + nombre;
}

/*function getApuestas(){
    return this.items;
}*/
