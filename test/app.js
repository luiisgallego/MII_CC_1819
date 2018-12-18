var request = require('supertest'),
should = require('should'),
app = require('../index.js');

describe("APP ON", function(){
    this.timeout(10000);
    it('Debería devolver 200.', function(done){
        request(app)
            .get('/')
            .expect('Content-Type',/json/)
            .expect(200, done)
    });
    it('Debería devolver status OK', function(done){
        request(app)
            .get('/')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {                    
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    done(); 
                } 
            });
    });
});

describe("Añadimos nuevo item (PUT)", function(){
    this.timeout(10000);
    it('Debería crear el item', function(done){
        request(app)
            .put('/item/prueba1/1/100')  
	        .expect('Content-Type', /json/)
            .expect(200, done)  
            /*.end(function(error, resultado){
                if(error) return done(error);
                else {
                    resultado.body.should.have.property('ID', 'ID_prueba1');
                    done();
                } 
            });*/
    });
    it('Debería devolver el item al completo', function(done){
        request(app)
            .put('/item/prueba2/2/200')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {
                    resultado.body.should.have.property('ID', 'ID_prueba2'); 
                    resultado.body.should.have.property('nombre', 'prueba2'); 
                    resultado.body.should.have.property('cantidad', 2); 
                    resultado.body.should.have.property('precio', 200);
                    done(); 
                }
            });
    });  
    it('Debería devolver error', function(done){
        request(app)
            .put('/item/prueba1/1/100')
            .expect('Content-Type',/json/)
            .expect(404)
            .end(function(error, resultado){
                if(error) return done(error);
                else {
                    resultado.body.should.have.property('txt', 'Error al insertar ITEM');
                    done(); 
                }
            });
    }); 
    it('Debería devolver 404 al insertar', function(done){
        request(app)
            .put('/item/prueba/1/X')
            .expect('Content-Type',/json/)
            .expect(404, done)
    }); 
});

describe("Realizamos consultas (GET)", function(){
    this.timeout(5000);
    it('Debería devolver los items', function(done){
        request(app)
            .get('/item')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {      
                    resultado.body[0].should.have.property('ID','ID_prueba1');
                    resultado.body[0].should.have.property('nombre','prueba1');
                    resultado.body[0].should.have.property('cantidad',1);
                    resultado.body[0].should.have.property('precio',100);
                    resultado.body[1].should.have.property('ID','ID_prueba2');
                    done(); 
                } 
            });
    });
    it('Debería devolver el ID', function(done){
        request(app)
            .get('/item/ID_prueba1')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {          
                    resultado.body[0].should.have.property('ID','ID_prueba1');
                    done(); 
                } 
            });
    });
    it('Debería devolver 404', function(done){
        request(app)
            .get('/item/ID_prueba12')
            .expect('Content-Type',/json/)
            .expect(404, done)
    });
});

describe("Borramos un item (DELETE)", function(){
    it('Debería borrar el item',function(done){
        request(app)
            .delete('/item/ID_prueba2')
            .expect('Content-Type',/json/)
            .expect(200, done)
    });
});

describe("Actualizamos un item (POST)", function(){
    it('Debería actualizar el item',function(done){
        request(app)
            .post('/item/prueba1/11/111')
            .expect('Content-Type',/json/)
            .expect(200, done)
    });
});

describe("Borramos el item restante", function(){
    it('Debería borrar el item',function(done){
        request(app)
            .delete('/item/ID_prueba1')
            .expect('Content-Type',/json/)
            .expect(200, done)
    });
});
