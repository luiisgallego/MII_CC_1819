// TEST UNITARIO - INTEGRACION

var request = require('supertest'),
should = require('should'),
app = require('../index.js');


// COMPROBAR
    // - TIPO MIME
    // - ESTADOS
    // - CONTENIDO

    // HACER UN PUT, Y LUEGO OTRO PUT IGUAL Y VER QUE DEVUELVE



describe("Añadimos nuevo item", function(){

    it('Debería crear el item', function(done){
        request(app)
            .put('/item/item1/3/100')  
	        .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('Debería devolver el ID',function(done){
        request(app)
            .put('/item/item2/5/300')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) {
                    return done(error);
                } else {                    
                    var res = resultado.body.ejemplo;
                    var valor = res.valor;
                    //var valor2 = resultado.body.respuesta.valor

                    resultado.body.should.have.property('status', 'OK'); 
                    res.should.have.property('ruta', '/item/:nombre/:cantidad/:precio');
                    valor.should.have.property('ID', 'ID_item2');                   
                    //console.log("LOG ID:" + valor2.ID);
                    done();
                }                
            });
    });

    /*it('Debería devolver el NOMBRE',function(done){
        request(app)
            .put('/item/item3/6/800')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) {
                    return done(error);
                } else {
                    resultado.body.should.have.property('nombre', 'item3');                    
                    //console.log("LOG nombre:" + resultado.body.nombre);
                    done();
                }                
            });
    });*/
});