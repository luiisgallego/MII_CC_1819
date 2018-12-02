var request = require('supertest'),
should = require('should'),
app = require('../index.js');

describe("Comprobamos que no hay Items", function(){
    it('Debería devolver 200.', function(done){
        request(app)
            .get('/')
            .expect('Content-Type',/json/)
            .expect(200, done)
    });
});

describe("Comprobamos BD", function(){
    it('Debería algun item', function(done){
        request(app)
            .get('/item')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else { 
                    
                    resultado.body[0].should.have.property('ID', 'probando');
                    done();
                } 
            });
    });
});




















/*
describe("Comprobamos que no hay Items", function(){
    it('Debería devolver 404.', function(done){
        request(app)
            .get('/item')
            .expect('Content-Type',/json/)
            .expect(404, done)
    });
});

describe("Añadimos nuevo item (PUT)", function(){
    it('Debería crear el item', function(done){
        request(app)
            .put('/item/prueba1/1/100')  
	        .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Debería devolver el ID',function(done){
        request(app)
            .put('/item/prueba2/2/200')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else { 
                    resultado.body.should.have.property('ID', 'ID_prueba2');
                    done();
                }                
            });
    });
    it('Debería devolver el item al completo', function(done){
        request(app)
            .put('/item/prueba3/3/300')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {
                    resultado.body.should.have.property('ID', 'ID_prueba3'); 
                    resultado.body.should.have.property('nombre', 'prueba3'); 
                    resultado.body.should.have.property('cantidad', '3'); 
                    resultado.body.should.have.property('precio', '300');
                    done(); 
                }
            });
    });   
    it('Debería devolver item ya existe', function(done){
        request(app)
            .put('/item/prueba3/3/300')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {
                    resultado.body.should.be.eql('ITEM ya existe');
                    done(); 
                }
            });
    }); 
});

describe("Actualizamos un item (POST)", function(){
    it('Debería actualizar el item',function(done){
        request(app)
            .post('/item/prueba2/21/210')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {                    
                    resultado.body.should.have.property('ID', 'ID_prueba2'); 
                    resultado.body.should.have.property('nombre', 'prueba2'); 
                    resultado.body.should.have.property('cantidad', '21'); 
                    resultado.body.should.have.property('precio', '210');
                    done(); 
                }                
            });
    });
    it('Debería devolver item no existe',function(done){
        request(app)
            .post('/item/prueba4/21/210')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {
                    resultado.body.should.be.eql('ITEM no existe');
                    done(); 
                }                
            });
    });
});

describe("Borramos un item (DELETE)", function(){
    it('Debería borrar el item',function(done){
        request(app)
            .delete('/item/ID_prueba2')
            .expect('Content-Type',/json/)
            .expect(200, done)
    });
    it('Debería devolver 404',function(done){
        request(app)
            .delete('/item/ID_prueba2')
            .expect('Content-Type',/json/)
            .expect(404, done)
    });
});

describe("Realizamos consultas (GET)", function(){
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
    it('Debería devolver los items', function(done){
        request(app)
            .get('/item')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {       
                    resultado.body.ID_prueba1.should.have.property('ID','ID_prueba1');
                    resultado.body.ID_prueba1.should.have.property('nombre','prueba1');
                    resultado.body.ID_prueba1.should.have.property('cantidad','1');
                    resultado.body.ID_prueba1.should.have.property('precio','100');
                    resultado.body.ID_prueba3.should.have.property('ID', 'ID_prueba3');
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
                    resultado.body.should.have.property('ID','ID_prueba1');
                    done(); 
                } 
            });
    });
    it('Debería devolver 404', function(done){
        request(app)
            .get('/item/ID_prueba2')
            .expect('Content-Type',/json/)
            .expect(404, done)
    });
});
*/