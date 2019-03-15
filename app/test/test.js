require('dotenv').load({silent: true});
process.env.NODE_ENV = 'test';

const User = require('../server/models/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let register_details = {
  'email': 'email@example.com',
  'password': '123@abc'
};


/**
* Test the following in on scoop:
* - Create an account, login with details, and check if token comes
*/

describe('Create Account', () => {
  before(function(done){
    User.findOneAndDeleteByEmail(register_details.email).exec(function(err, user) {
      done();
    });
  });

  describe('/POST /auth/register', () => {
    it('it should register', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send(register_details)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should not register if user exists', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send(register_details)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});