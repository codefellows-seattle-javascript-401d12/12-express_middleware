'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Person = require('../model/person.js');
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

require('../server.js');

const examplePerson = {
  name: 'test name',
  gender: 'gender'
};

describe('Person Routes', function(){

  describe('GET: /api/person', function(){
    describe('with a valid body', function(){
      before( done => {
        Person.createPerson(examplePerson)
        .then( person => {
          this.tempPerson = person;
          done();
        })
        .catch(done);
      });

      after(done => {
        Person.deletePerson(this.tempPerson.id)
        .then( () => done())
        .catch(done);
      });

      it('should return a note', done => {
        request.get(`${url}/api/person/${this.tempPerson.id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPerson.id);
          expect(res.body.name).to.equal(this.tempPerson.name);
          expect(res.body.gender).to.equal(this.tempPerson.gender);
          done();
        });
      });

      describe('with an invalid ID ', function(){
        it('sould respond with a 404 status code', done => {
          request.get( `${url}/api/person/12345`)
          .end((err,res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });

    });

  });
  describe('POST: /api/person', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempPerson){
          Person.deletePerson(this.tempPerson.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a note', done => {
        request.post(`${url}/api/person`)
        .send(examplePerson)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(examplePerson.name);
          expect(res.body.gender).to.equal(examplePerson.gender);
          this.tempPerson = res.body;
          done();
        });
      });
    });
  });
  describe('PUT: /api/person', function(){
    describe('with a valid body and id', function(){
      before(done => {
        Person.createPerson(examplePerson)
          .then(person => {
            this.tempPerson = person;
            done();
          })
          .catch(done);
      });

      after( done => {
        if( this.tempPerson){
          Person.deletePerson(this.tempPerson.id)
            .then( () => done())
            .catch(done);
        }
      });

      it('should return a person', done => {
        let updatePerson = {name: 'new name', gender:'new gender'};
        request.put(`${url}/api/person?id=${this.tempPerson.id}`)
          .send(updatePerson)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(this.tempPerson.id);
            done();
          });
      });
    });
  });
});
