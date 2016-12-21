'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Hat = require('../model/hat.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleHat = {
  name: 'example name',
  content: 'example content'
};

describe('Hat Routes', function() {

  describe('GET: /api/hat', function() {
    describe('with a valid id', function() {
      before( done => {
        Hat.createHat(exampleHat)
        .then(hat => {
          this.tempHat = hat;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Hat.deleteHat(this.tempHat.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return a hat', done => {
        request.get(`${url}/api/hat/${this.tempHat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempHat.id);
          expect(res.body.name).to.equal(this.tempHat.name);
          expect(res.body.content).to.equal(this.tempHat.content);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/hat/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/hat', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempHat) {
          Hat.deleteHat(this.tempHat.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return a hat', done => {
        request.post(`${url}/api/hat`)
        .send(exampleHat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleHat.name);
          expect(res.body.content).to.equal(exampleHat.content);
          this.tempHat = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/hat', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Hat.createHat(exampleHat)
        .then( hat => {
          this.tempHat = hat;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempHat) {
          Hat.deleteHat(this.tempHat.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a hat', done => {
        let updateHat = { name: 'new name', content: 'new content' };
        request.put(`${url}/api/hat?id=${this.tempHat.id}`)
        .send(updateHat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempHat.id);
          for (var prop in updateHat) {
            expect(res.body[prop]).to.equal(updateHat[prop]);
          }
          done();
        });
      });
    });
  });
});
