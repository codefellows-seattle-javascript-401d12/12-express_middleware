'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Song = require('../model/song.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleSong = {
  title: 'Work',
  description: 'This is the best song by Iggy'
};

describe('Song Routes', function() {
  describe('GET: /api/song', function() {
    describe('has a valid id', function() {
      before( done => {
        Song.createSong(exampleSong)
        .then(song => {
          this.tempSong = song;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Song.deleteSong(this.tempSong.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return a song', done => {
        request.get(`${url}/api/song/${this.tempSong.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSong.id);
          expect(res.body.title).to.equal(this.tempSong.title);
          expect(res.body.description).to.equal(this.tempSong.description);
          done();
        });
      });

      describe('has an invalid id', function() {
        it('should respond with a 404 status', done => {
          request.get(`${url}/api/song/45463782`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/song', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempSong) {
          Song.deleteSong(this.tempSong.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return a song', done => {
        request.post(`${url}/api/song`)
        .send(exampleSong)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(exampleSong.title);
          expect(res.body.description).to.equal(exampleSong.description);
          this.tempSong = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/song', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Song.createSong(exampleSong)
        .then( song => {
          this.tempSong = song;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempSong) {
          Song.deleteSong(this.tempSong.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a song', done => {
        let updateSong = { title: 'new title', description: 'new description' };
        request.put(`${url}/api/song/${this.tempSong.id}`)
        .send(updateSong)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSong.id);
          for (var prop in updateSong) {
            expect(res.body[prop]).to.equal(updateSong[prop]);
          }
          done();
        });
      });
    });
  });
});
