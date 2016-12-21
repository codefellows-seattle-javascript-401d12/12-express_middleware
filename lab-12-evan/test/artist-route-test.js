'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Artist = require('../model/artist.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleArtist = {
  name: 'exampleArtist',
  genre: 'exampleGenre',
  topHits: 'exampleTopHits'
};

describe('Artist Routes', function() {
  describe('GET: /api/artist', function() {
    describe('with a valid body', function() {
      before( done => {
        Artist.newArtist(exampleArtist)
        .then( artist => {
          this.tempArtist = artist;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Artist.deleteArtist(this.tempArtist.id)
        .then( () => done())
        .catch(done)
      });
      it('should return an artist', done => {
        request.get(`${url}/api/artist/${this.tempArtist.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempArtist.id);
          expect(res.body.name).to.equal(this.tempArtist.name);
          expect(res.body.genre).to.equal(this.tempArtist.genre);
          expect(res.body.topHits).to.equal(this.tempArtist.topHits);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404', done => {
          request.get(`${url}/api/artist/109876543210`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });

    describe('POST: /api/artist', function() {
      describe('with a valid body', function() {
        after( done => {
          if(this.tempArtist) {
            Artist.deleteArtist(this.tempArtist.id)
            .then( () => done())
            .catch(done);
          };
        });

        it('should return an artist', done => {
          request.post(`${url}/api/artist`)
          .send(exampleArtist)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(exampleArtist.name);
            expect(res.body.genre).to.equal(exampleArtist.genre);
            expect(res.body.topHits).to.equal(exampleArtist.topHits);
            this.tempArtist = res.body;
            done();
          });
        });
      });
    });  

    describe('PUT: /api/artist', function() {
      describe('with a valid body and id', function() {
        before( done => {
          Artist.newArtist(exampleArtist)
          .then( artist => {
            this.tempArtist = artist;
            done();
          })
          .catch(done);
        })

        after( done => {
          if(this.tempArtist) {
            Artist.deleteArtist(this.tempArtist.id)
            .then( () => done())
            .catch(done);
          };
        });

        it('should return an artist', done => {
          let updateArtist = { name: 'newArtistName', genre: 'newArtistGenre', topHits: 'newArtistTopHits' };
          request.put(`${url}/api/artist?id=${this.tempArtist.id}`)
          .send(updateArtist)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(this.tempArtist.id);
            done();
          });
        });
      });
    });
  });
});
