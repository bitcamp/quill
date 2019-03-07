process.env.NODE_ENV = 'test';
// TODO: This should be loaded by app
process.env.JWT_SECRET = 'test';

let mongoose = require('mongoose');
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
  beforeEach(function(done){
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
  });
});