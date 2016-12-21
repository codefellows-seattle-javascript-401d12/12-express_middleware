'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Pin = require('../model/pin.js');
const url = 'http://localhost:3000';

require('../server.js');

const examplePin = {
  title: 'example title',
  skill: 'example skill'
};

describe('Pin Routes', function() {

  describe('GET: /api/pin', function() {
    describe('with a valid id', function() {
      //create test pin
      before(done => {
        Pin.createPin(examplePin)
        .then(pin => {
          this.tempPin = pin;
          done();
        })
        .catch(done);
      });
      //delete test pin
      after(done => {
        Pin.deletePin(this.tempPin.id)
        .then(() => done())
        .catch(done);
      });

      it('should return a pin', done => {
        request.get(`${url}/api/pin/${this.tempPin.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPin.id);
          expect(res.body.title).to.equal(this.tempPin.title);
          expect(res.body.skill).to.equal(this.tempPin.skill);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/pin/93745df27n98x`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/pin', function() {
    describe('with a valid body', function() {
      after(done => {
        if (this.tempPin) {
          Pin.deletePin(this.tempPin.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('should return a pin', done => {
        request.post(`${url}/api/pin`)
        .send(examplePin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(examplePin.title);
          expect(res.body.skill).to.equal(examplePin.skill);
          this.tempPin = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/pin', function() {
    describe('with a valid id and body', function() {
      before(done => {
        Pin.createPin(examplePin)
        .then(pin => {
          this.tempPin = pin;
          done();
        })
        .catch(done);
      });

      after(done => {
        if (this.tempPin) {
          Pin.deletePin(this.tempPin.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('should return a pin', done => {
        let updatePin = {title: 'new title', skill: 'new skill'};
        request.put(`${url}/api/pin?id=${this.tempPin.id}`)
        .send(updatePin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPin.id);
          for (var prop in updatePin) {
            expect(res.body[prop]).to.equal(updatePin[prop]);
          }
          done();
        });
      });
    });
  });
});
