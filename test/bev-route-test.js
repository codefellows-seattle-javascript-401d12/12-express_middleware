'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const BEV = require('../model/bev.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleVehicle = {
  vehicle: 'Make Model',
  info: 'Info about the vehicle',
  range: 300,
  mpge: 100
};

describe('BEV Routes', function() {

  describe('GET: /api/bev/:id', function() {

    describe('with a valid body', function() {
      before( done => {
        BEV.createVehicle(exampleVehicle)
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch( err => done(err));
      });
      after( done => {
        BEV.deleteVehicle(this.tempVehicle.id)
        .then( () => done())
        .catch(done);
      });
      it('should return data for a vehicle', done => {
        request.get(`${url}/api/bev/${this.tempVehicle.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempVehicle.id);
          expect(res.body.vehicle).to.equal(this.tempVehicle.vehicle);
          expect(res.body.info).to.equal(this.tempVehicle.info);
          expect(res.body.range).to.be.a('number');
          done();
        });
      });
    });

    describe('with an invalid id', function() {
      it('should respond with a 404 status code', done => {
        request.get(`${url}/api/bev/dummy-id`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('NotFoundError');
          done();
        });
      });
    });
  });

  describe('POST: /api/bev', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempVehicle) {
          BEV.deleteVehicle(this.tempVehicle.id)
          .then( () => done())
          .catch(done);
        };
      });

      it('should return data for a vehicle', done => {
        request.post(`${url}/api/bev`)
        .send(exampleVehicle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.vehicle).to.equal(exampleVehicle.vehicle);
          expect(res.body.info).to.equal(exampleVehicle.info);
          expect(res.body.range).to.be.a('number');
          this.tempVehicle = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/bev/ (get all IDs)', function() {
    describe('with a valid body', function() {
      before( done => {
        BEV.createVehicle(exampleVehicle)
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch( err => done(err));
      });
      after( done => {
        BEV.deleteVehicle(this.tempVehicle.id)
        .then( () => done())
        .catch(done);
      });

      it('should return an array of IDs for all vehicle data entries', done => {
        request.get(`${url}/api/bev`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.include(this.tempVehicle.id);
          done();
        });
      });
    });
  });

  describe('PUT: /api/bev', function() {
    describe('with a valid body and ID', function() {
      before( done => {
        BEV.createVehicle(exampleVehicle)
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch( err => done(err));
      });
      after( done => {
        if (this.tempVehicle) {
          BEV.deleteVehicle(this.tempVehicle.id)
          .then( () => done())
          .catch(done);
        };
      });

      it('should return data for a vehicle', done => {
        let updatedVehicleData = {
          vehicle: 'Updated Make Model',
          info: 'Info about the updated vehicle',
          range: 80,
          mpge: 120
        };
        request.put(`${url}/api/bev?id=${this.tempVehicle.id}`)
        .send(updatedVehicleData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempVehicle.id);
          expect(res.body.info).to.equal(updatedVehicleData.info);
          expect(res.body.mpge).to.be.a('number');
          done();
        });
      });
    });
  });

  // describe('DELETE')
});
