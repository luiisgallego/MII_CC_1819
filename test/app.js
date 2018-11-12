var request = require('supertest'),
should = require('should'),
app = require('../index.js');

describe("Comprobamos que no hay Items", function(){
    it('Debería devolver no hay items', function(done){
        request(app)
            .get('/item')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {                    
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    resultado.body.ejemplo.should.have.property('ruta', '/item');
                    resultado.body.ejemplo.should.have.property('valor', 'No hay Items.');
                    done(); 
                } 
            });
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
                    //var res = resultado.body.ejemplo;
                    var valor = resultado.body.ejemplo.valor;
                    valor.should.have.property('ID', 'ID_prueba2');
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
                    var valor = resultado.body.ejemplo.valor;
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:nombre/:cantidad/:precio');
                    // Comprobamos ejemplo -> valor
                    valor.should.have.property('ID', 'ID_prueba3'); 
                    valor.should.have.property('nombre', 'prueba3'); 
                    valor.should.have.property('cantidad', '3'); 
                    valor.should.have.property('precio', '300');
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
                    var valor = resultado.body.ejemplo.valor;
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:nombre/:cantidad/:precio');
                    resultado.body.ejemplo.should.have.property('valor', 'ITEM ya existe');
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
                    var valor = resultado.body.ejemplo.valor;
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:nombre/:cantidad/:precio');
                    // Comprobamos ejemplo -> valor
                    valor.should.have.property('ID', 'ID_prueba2'); 
                    valor.should.have.property('nombre', 'prueba2'); 
                    valor.should.have.property('cantidad', '21'); 
                    valor.should.have.property('precio', '210');
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
                    var valor = resultado.body.ejemplo.valor;
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:nombre/:cantidad/:precio');
                    resultado.body.ejemplo.should.have.property('valor', 'ITEM no existe');
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
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {                    
                    var valor = resultado.body.ejemplo.valor;
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:ID');
                    done(); 
                }                
            });
    });
    it('Debería devolver item no existe',function(done){
        request(app)
            .delete('/item/ID_prueba2')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {                    
                    var valor = resultado.body.ejemplo.valor;
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:ID');
                    resultado.body.ejemplo.should.have.property('valor', 'ITEM no existe');
                    done(); 
                }                
            });
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
                    resultado.body.should.have.property('status', 'OK_MEN3');
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
                    var valor = resultado.body.ejemplo.valor;        
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item');
                    // Comprobamos ejemplo -> valor
                    valor.ID_prueba1.should.have.property('ID','ID_prueba1');
                    valor.ID_prueba1.should.have.property('nombre','prueba1');
                    valor.ID_prueba1.should.have.property('cantidad','1');
                    valor.ID_prueba1.should.have.property('precio','100');
                    valor.ID_prueba3.should.have.property('ID', 'ID_prueba3');
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
                    var valor = resultado.body.ejemplo.valor;       
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:ID');
                    // Comprobamos ejemplo -> valor
                    valor.should.have.property('ID','ID_prueba1');
                    done(); 
                } 
            });
    });
    it('Debería devolver el item no existe', function(done){
        request(app)
            .get('/item/ID_prueba2')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(error, resultado){
                if(error) return done(error);
                else {          
                    var valor = resultado.body.ejemplo.valor;       
                    // Comprobamos status
                    resultado.body.should.have.property('status', 'OK');
                    // Comprobamos ejemplo -> ruta
                    resultado.body.ejemplo.should.have.property('ruta', '/item/:ID');
                    resultado.body.ejemplo.should.have.property('valor', 'ITEM no existe');
                    done(); 
                } 
            });
    });
});
