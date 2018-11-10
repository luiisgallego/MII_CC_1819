var assert = require("assert"),
items = require(__dirname+"/../items.js");
//import Items from "/../items.js";

// Variable local
var item;

describe('Items', function(){

    // Probamos que se haya cargado bien la clase
    describe('Carga', function(){
        it('Deberia estar cargado el  módulo', function(){
            assert(items, "Cargado");
        });
    });

    // Probamos que se cree correctamente cada atributo
    item = new items("Prueba1", "1", "100");
    describe('ID', function(){
        it('Debería ser correcto el ID', function(){
            assert.equal(item.ID, "ID_Prueba1");
        });    
    });
    describe('Nombre', function(){
        it('Debería ser correcto el Nombre', function(){
            assert.equal(item.nombre, "Prueba1");
        });    
    });
    describe('Cantidad', function(){
        it('Debería ser correcta la cantidad', function(){
            assert.equal(item.cantidad, "1");
        });    
    });
    describe('Precio', function(){
        it('Debería ser correcto el Precio', function(){
            assert.equal(item.precio, "100");
        });    
    });

    // Probamos las distintas funciones
    describe('getID', function(){
        it('Debería ser correcto el ID devuelto', function(){
            assert.equal(item.getID(), "ID_Prueba1");
        });    
    });
    describe('creaID', function(){
        it('Debería ser correcto el ID creado', function(){
            assert.equal(item.creaID("Prueba2"), "ID_Prueba2");
        });    
    });
});