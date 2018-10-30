//THIS MAY NOT BE NEEDED FOR P.M.
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

it('it should GET the index.html file', (done) => {
    chai.request(server)
        .get('/index.html')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });

});

it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});
//can probably delete below test later, but better check before doing so
it('it should GET all the users', (done) => {
    chai.request(server)
    //changed users in below line to todos
        .get('/api/todos')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3);
            res.body[0].should.be.a('object');
            //changed name to todo, and other relevant words below
            res.body[0].should.have.property('todo');
            res.body[0].should.have.property('priority');
            res.body[0].todo.should.be.a('string');
            res.body[0].todo.should.equal('exam');
            done();
        });
});
