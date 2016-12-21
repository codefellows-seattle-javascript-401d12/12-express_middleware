'use strict';

const expect = require('chai').expect;
const request = require('bluebird');
const Dog = require('../model/dogs.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleDog = {
  name: 'example name',
  breed: 'example breed',
  color: 'example color'
};

describe('Dog Route', function() {
  describe('GET: /api/dog', function() {
    before( done => {
      Dog.createDog(exampleDog)
      .then( dog => {
        this.tempDog = dog;
        done();
      })
      .catch( err => done(err));
    });
    after( done => {
      Dog.deleteDog(this.tempDog.id)
      .then( () => done())
      .catch(done);
    });
    it('should return a dog', done => {
      request.get(`${url}/api/dog/${this.tempDog.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempDog.id);
        expect(res.body.name).to.equal(this.tempDog.name);
        expect(res.body.breed).to.equal(this.tempDog.breed);
        expect(res.body.color).to.equal(this.tempDog.color);
        done();
      });
    });
    describe('with an invalid id', function() {
      it('should respond with 404 status code', done => {
        request.get(`${url}/api/dog/11111111`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('POST: /api/dog', function() {
    describe('with a valid body', function() {
      after( done => {
        if(this.tempDog) {
          Dog.deleteDog(this.tempDog.id)
          .then( () => done())
          .catch(done);
        }
      });
      it('should return a dog', done => {
        request.post(`${url}/api/dog`)
        .send(exampleDog)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleDog.name);
          expect(res.body.breed).to.equal(exampleDog.breed);
          expect(res.body.color).to.equal(exampleDog.color);
          this.tempDog = res.body;
          done();
        });
      });
    });
  });
  describe('PUT: /api/dog', function() {
    describe('with a valid body and id', function() {
      before( done => {
        Dog.createDog(exampleDog)
        .then( dog => {
          this.tempDog = dog;
          done();
        })
        .catch( err => done(err));
      });
      after( done => {
        if (this.tempDog) {
          Dog.deleteDog(this.tempDog.id)
          .then( () => done())
          .catch(done);
        }
      });
      it('should return a dog', done => {
        let updateDog = { name:'new name', breed: 'new breed', color:'new color'};
        request.put(`${url}/api/dog?id=${this.tempDog.id}`)
        .send(updateDog)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempDog.id);
          for (var prop in updateDog) {
            expect(res.body[prop]).to.equal(updateDog[prop]);
          }
          done();
        });
      });
    });
  });
});
