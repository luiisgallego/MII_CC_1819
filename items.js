// Definición de la clase Items: 
//
//    var item = new Items(nombre,cantidad,precio);
//
//* `nombre` = nombre item
//* `cantidad` = numero de items
//*  `precio` = valor

class Items {

    constructor(nombre, cantidad, precio){
        this.ID = this.creaID(nombre);
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio; 
    }
    
    getID() {
        return this.ID;
    }
    
    creaID(nombre){
        return "ID_" + nombre;
    }
}

module.exports = Items;
