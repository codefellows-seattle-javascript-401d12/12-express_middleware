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

  describe('GET /api/player', function() {
    before( done => {
      //TODO: Consider making a list of players.
      Player.create(examplePlayer)
      .then( player => {
        this.tempPlayer = player;
        done();
      })
      .catch(done);
    });

    after( done => {
      if(!this.tempPlayer) return done();
      Player.delete(this.tempPlayer.id)
      .then( () => {
        delete this.tempPlayer;
        done();
      })
      .catch(done);
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

    // This test assumes that the only items in the collection
    // are the ones we put in for the test.
    it('should return a list of ids without id param', done => {
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

  describe('DELETE /api/player', function() {
    before( done => {
      Player.create(examplePlayer)
      .then( player => {
        this.tempPlayer = player;
        done();
      })
      .catch(done);
    });

    //If the test fails, we may still want to clean up.
    after( done => {
      if(!this.tempPlayer) return done();
      Player.delete(this.tempPlayer.id)
      .then( () => {
        delete this.tempPlayer;
        done();
      })
      .catch(done);
    });

    it('should delete an item with valid id', done => {
      request.delete(`${url}/${this.tempPlayer.id}`)
      .end( (err, res) => {
        expect(err).to.not.be.an('error');
        expect(res.status).to.equal(204);
        //TODO: Do we need to check the item that is returned against the example?
        Player.fetch(this.tempPlayer.id)
        .catch( () => {
          delete this.tempPlayer;
          done();
        });
      });
    });

    it('should 404 on an unknown player', done => {
      request.delete(`${url}/bogus12345`)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST /api/player', function() {
    after( done => {
      if(!this.tempPlayer) return done();
      Player.delete(this.tempPlayer.id)
      .then( () => {
        delete this.tempPlayer;
        done();
      })
      .catch(done);
    });


    it('should create a player with valid body', done => {
      request.post(`${url}`)
      .send(examplePlayer)
      .end( (err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(examplePlayer.name);
        expect(res.body.email).to.equal(examplePlayer.email);
        expect(res.body.id).to.be.ok;
        this.tempPlayer = res.body; //For cleanup
        done();
      });
    });

    it('should 400 with a missing name', done => {
      request.post(`${url}`)
      .send( { email: 'foo@bar.net'} )
      .end( (err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should 400 with a missing email', done => {
      request.post(`${url}`)
      .send( { name: 'Some guy'} )
      .end( (err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('PUT /api/player', function() {
    //TODO: Should we move the before call up to a higher describe()?
    //      Would `this` have the right context across tests?
    before( done => {
      Player.create(examplePlayer)
      .then( player => {
        this.tempPlayer = player;
        done();
      })
      .catch(done);
    });

    after( done => {
      if(!this.tempPlayer) return done();
      Player.delete(this.tempPlayer.id)
      .then( () => {
        delete this.tempPlayer;
        done();
      })
      .catch(done);
    });

    it('should modify a player with valid body and id', done => {
      let update = { name: 'Some other guy'};
      request.put(`${url}/${this.tempPlayer.id}`)
      .send(update)
      .end( (err, res) => {
        expect(err).to.not.be.an('error');
        expect(res.status).to.equal(202);
        expect(res.body.name).to.equal(update.name);
        expect(res.body.email).to.equal(examplePlayer.email); //Not modified
        expect(res.body.id).to.equal(this.tempPlayer.id);
        done();
      });
    });

    it('should 404 on an unknown player', done => {
      let update = { name: 'Some other guy'};
      request.put(`${url}/not-a-real-id`)
      .send(update)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

});
