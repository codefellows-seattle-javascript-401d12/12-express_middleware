'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Player = require('../model/player.js');
const debug = require('debug')('mnp:player-route-test');

request('../server.js');

//TODO: Perhaps PORT = require('../server.js').PORT; ?
const PORT = process.env.PORT || 8000;

const url = `http://localhost:${PORT}/api/player`;

const examplePlayer = {
  name: 'Joe Player',
  email: 'joe@foo.com'
};

describe('Player Routes', function() {
  before( done => {
    debug('setting up server...');
    require('../server.js').start()
    .then(done)
    .catch(done);
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

    it('should return a player', done => {
      let tempUrl = `${url}/${this.tempPlayer.id}`;
      debug('tempUrl:',tempUrl);
      request.get(tempUrl)
      .end( (err, res) => {
        debug('err:',err);
        debug('res:',res);
        if(err) return done(err);
        // expect(err).to.not.be.an('error');
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
