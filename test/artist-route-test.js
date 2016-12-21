'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Artist = require('../model/music-artists.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleArtist = {
  name: 'test name',
  genre: 'test genre'
};

describe('Artist Routes', function() {

  describe('GET: /api/artist', function() {
    describe('with a vaild id', function() {
      before( done => {
        Artist.createArtist(exampleArtist)
        .then(artist => {
          this.tempArtist = artist;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Artist.deleteArtist(this.tempArtist.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return an artist', done => {
        request.get(`${url}/api/artist/${this.tempArtist.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempArtist.id);
          expect(res.body.name).to.equal(this.tempArtist.name);
          expect(res.body.content).to.equal(this.tempArtist.content);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with 404 status code', done => {
          request.get(`${url}/api/artist/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/artist', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempArtist) {
          Artist.deleteArtist(this.tempArtist.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return an artist', done => {
        request.post(`${url}/api/artist`)
        .send(exampleArtist)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleArtist.name);
          expect(res.body.content).to.equal(exampleArtist.content);
          this.tempNote = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/artist', function() {
    describe('with a valid id & body', function() {
      before( done => {
        Artist.createArtist(exampleArtist)
        .then( artist => {
          this.tempArtist = artist;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if(this.tempArtist) {
          Artist.deleteArtist(this.tempArtist.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return an artist', done => {
        let updateArtist = {name: 'new name', genre: 'new genre'};
        request.put(`${url}/api/artist?id=${this.tempArtist.id}`)
        .send(updateArtist)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempArtist.id);
          for (var prop in updateArtist) {
            expect(res.body[prop]).to.equal(updateArtist[prop]);
          }
          done();
        });
      });
    });
  });

});
