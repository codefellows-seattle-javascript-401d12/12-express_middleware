'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Player = require('../model/player.js');

const server = require('../server.js');
const PORT = server.PORT;

const url = `http://localhost:${PORT}/api/player`;

const examplePlayer = {
  name: 'Joe Player',
  email: 'joe@foo.com'
};

describe('Player Routes', function() {
  before( done => {
    require('../server.js').start()
    .then(done)
    .catch(done);
  });

  describe('DELETE /api/player', function() {
    before( done => {
      Player.create(examplePlayer)
      .then( player => {
        this.tempPlayer = player;
        done();
      })
      .catch(done);
    });

    it('should delete an item', done => {
      request.delete(`${url}/${this.tempPlayer.id}`)
      .end( (err, res) => {
        expect(err).to.not.be.an('error');
        expect(res.status).to.equal(204);
        //TODO: Do we need to check the item that is returned against the example?
        Player.fetch(this.tempPlayer.id)
        .catch( () => {
          done();
        });
      });
    });
  });


  describe('GET /api/player', function() {
    before( done => {
      Player.create(examplePlayer)
      .then( player => {
        this.tempPlayer = player;
        done();
      })
      .catch(done);
    });

    after( done => {
      if(this.tempPlayer) {
        Player.delete(this.tempPlayer.id)
        .then( () => done())
        .catch(done);
      }
    });

    it('should return a player with a valid id', done => {
      request.get(`${url}/${this.tempPlayer.id}`)
      .end( (err, res) => {
        if(err) return done(err);
        expect(err).to.not.be.an('error');
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(examplePlayer.name);
        expect(res.body.email).to.equal(examplePlayer.email);
        expect(res.body).to.have.property('id');
        done();
      });
    });

    it('should return a 404 with a bogus id', done => {
      request.get(`${url}/bogus1234`)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        expect(err).to.be.an('error');
        done();
      });
    });

    it('should return a list of ids without id', done => {
      request.get(`${url}`)
      .end( (err, res) => {
        expect(err).to.not.be.an('error');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.deep.equal([this.tempPlayer.id]);
        done();
      });
    });

  });
});
