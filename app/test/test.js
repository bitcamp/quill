require('dotenv').load({silent: true});
process.env.NODE_ENV = 'test';

const User = require('../server/models/User');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

let register_details = {
  'email': 'email@example.com',
  'password': '123@abc'
};


/**
* Test the following in one swoop:
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