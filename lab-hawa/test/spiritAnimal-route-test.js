'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const SpiritAnimal = require('../model/spiritAnimal.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleSpiritAnimal = {
  name: 'example name',
  spiritAnimal: 'example spiritAnimal',
  spiritAnimalName: 'example spiritAnimalName'
};

describe('Spirit Animal Route', function() {

  describe('GET: /api/spiritAnimal', function() {
    describe('with a valid body', function() {
      before( done => {
        SpiritAnimal.createSpiritAnimal(exampleSpiritAnimal)
        .then.tempSpiritAnimal = spiritAnimal;
        done();
      })
      .catch( err => done(err));
    });

    after( done => {
      SpiritAnimal.deleteSpiritAnimal(this.tempSpiritAnimal.id)
      .then( () => done())
      .catch(done);
    });

    it('should return a spirit animal', done => {
      request.get(`${url}/api/spiritAnimal${this.tempSpiritAnimal.id}`)
      .end( (err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempSpiritAnimal.id);
        expect(res.body.name).to.equal(this.tempSpiritAnimal.name);
        expect(res.body.spiritAnimal).to.equal(this.tempSpiritAnimal.spiritAnimal);
        expect(res.body.spiritAnimalName).to.equal(this.tempSpiritAnimal.spiritAnimalName);
        done();
      });
    });

    describe('with an invalid id', function() {
      it('should respond with a 404 status', done => {
        request.get(`${url}/api/spiritAnimal/123456789`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST: /api/spiritAnimal', function() {
    describe('with an valid body', function() {
      after( done => {
        if(this.tempSpiritAnimal) {
          SpiritAnimal.deleteItem(this.tempSpiritAnimal.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a spiritAnimal', done => {
        request.post(`${url}/api/spiritAnimal`)
        .send(exampleSpiritAnimal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(this.exampleSpiritAnimal.name);
          expect(res.body.spiritAnimal).to.equal(this.exampleSpiritAnimal.spiritAnimal);
          expect(res.body.spiritAnimalName).to.equal(this.exampleSpiritAnimal.spiritAnimalName);
          this.tempSpiritAnimal = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/spiritAnimal', function() {
    describe('with a valid body and id', function() {
      before( done => {
        SpiritAnimal.createSpiritAnimal(exampleSpiritAnimal)
        .then( spiritAnimal => {
          this.tempSpiritAnimal = spiritAnimal;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.tempSpiritAnimal) {
          SpiritAnimal.deleteSpiritAnimal(this.tempSpiritAnimal.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a spiritAnimal', done => {
        let updateSpiritAnimal = { spiritAnimal: 'new name', spiritAnimal: 'new spiritAnimal', spiritAnimalName: 'new spiritAnimalName' };
        request.put(`${url}/api/spiritAnimal?id=${this.tempSpiritAnimal.id}`)
        .send(updateSpiritAnimal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempSpiritAnimal.id);
          done();
        }
      );
      });
    });
  });
});
