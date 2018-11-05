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
    //changed houses to pets
        .get('/api/pets')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            //changed house and other relevant words below
            res.body[0].should.have.property('fname');
            res.body[0].should.have.property('lname');
            res.body[0].fname.should.be.a('string');
            res.body[0].fname.should.equal('Bob');
            done();
        });
});
//might want to add more to the above test, esp if it does not work.