'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Joke = require('../model/joke.js');
const url = 'http://localhost:2000';

require('../server.js');

const exampleJoke = {
  setup: 'I got in trouble at the airport last week...',
  punchline: 'I guess you\'re not supposed to call "shotgun" when boarding a plane.'
};

describe('Joke routes', function() {

  describe('GET: /api/joke', function() {
    describe('with a valid id', function() {
      before( done => { //done before the tests
        Joke.createJoke(exampleJoke)
        .then( joke => {
          //console.log(joke);
          this.tempJoke = joke;
          done();
        })
        .catch(err => done(err)); //err => done(err)
      });

      after( done => { //done after the tests
        Joke.deleteJoke(this.tempJoke.id)
        .then( () => done())
        .catch(err => done(err));
      });

      it('should return a joke', done => {
        request.get(`${url}/api/joke/${this.tempJoke.id}`)
        .end( (err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempJoke.id);
          expect(res.body.setup).to.equal(this.tempJoke.setup);
          expect(res.body.punchline).to.equal(this.tempJoke.punchline);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with 404 status code', done => {
          request.get(`${url}/api/joke/123456789`)
          .end( (err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });

      describe('with no id', function() {
        it('should respond with a list of jokes', done => {
          request.get(`${url}/api/joke`)
          .end( (err, res) => {
            expect(res.status).to.equal(200);
            console.log(res.body);
            expect(typeof res.body).to.equal('object');
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/joke', function() {
    describe('with a valid body', function() {

      after( done => {
        if (this.tempJoke) {
          Joke.deleteJoke(this.tempJoke.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a joke', done => {
        request.post(`${url}/api/joke`)
        .send(exampleJoke)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.setup).to.equal(exampleJoke.setup);
          expect(res.body.punchline).to.equal(exampleJoke.punchline);
          this.tempJoke = res.body;
          done();
        });
      });

    });
  });

  describe('PUT: /api/joke', function() {
    describe('with a valid body and id', function() {

      before( done => {
        Joke.createJoke(exampleJoke)
        .then( joke => {
          this.tempJoke = joke;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempJoke) {
          Joke.deleteJoke(this.tempJoke.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return an updated joke', done => {
        let updatedJoke = {setup: 'new setup', punchline: 'new punchline'};
        request.put(`${url}/api/joke?id=${this.tempJoke.id}`)
        .send(updatedJoke)
        .end( (err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempJoke.id);
          done();
        });
      });

    });
  });

});
