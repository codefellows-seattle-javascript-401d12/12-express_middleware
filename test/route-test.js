'use strict';

const SkiData = require('../model/ski-data.js');
const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('ski:route-test');
const url = 'http://localhost:3000';

require('../server.js');

const testObj = {
  location: 'Test Location',
  rating: '5'
};

describe('SkiData Routes', function(){
  describe('GET: /api/ski', function() {
    describe('valid body', function() {
      before( done => {
        SkiData.createData(testObj)
          .then( skiData => {
            this.tempData = skiData;
            done();
          })
          .catch(done);
      });
      after( done => {
        SkiData.deleteData(this.tempData.id)
          .then( () => done())
          .catch(done);
      });
      it('should return a skiData file', done => {
        debug('should return a skiData file');

        request.get(`${url}/api/ski/${this.tempData.id}`)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(this.tempData.id);
            expect(res.body.location).to.equal(this.tempData.location);
            expect(res.body.rating).to.equal(this.tempData.rating);
            done();
          });
      });
    });
    describe('invalid id', function() {
      it('should respond with a 404 status code', done => {
        debug('should respond with a 404 status code');

        request.get(`${url}/api/ski/123456789`)
        .end( (res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('POST: /api/ski', function() {
    describe('valid body', function() {
      after( done => {
        if(this.tempData) {
          SkiData.deleteData(this.tempData.id)
          .then( () => done())
          .catch(done);
        }
      });
      it('should return a skiData file', done => {
        request.post(`${url}/api/ski`)
        .send(testObj)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal(testObj.location);
          expect(res.body.rating).to.equal(testObj.rating);
          this.tempData = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/sk', function() {
    describe('valid body and id', function() {
      before( done => {
        SkiData.createData(testObj)
        .then( skiData => {
          this.tempData = skiData;
          done();
        })
        .catch(done);
      });
      after( done => {
        if(this.tempData) {
          SkiData.deleteData(this.tempData.id)
          .then( () => done())
          .catch(done);
        }
      });
      it('should return a skiData file', done => {
        let newData = { location: 'new location', rating: 'new rating'};
        request.put(`${url}/api/ski/${this.tempData.id}`)
        .send(newData)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});
