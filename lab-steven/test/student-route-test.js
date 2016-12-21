'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Student = require('../model/student-constructor.js');
const PORT = process.env.PORT || 8080;
const url = `http://localhost:${PORT}`;

const sampleStudent = {
  name: 'Steven',
  age: '30',
  badass: 'Yes'
};

describe('Student Router.', () => {
  describe('POST routes.', () => {
    describe('With a valid object passed in.', () => {
      after(done => {
        if (this.tempStudent) {
          Student.deleteStudent(this.tempStudent.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('Should return a student object with an age and name.', done => {
        request
        .post(`${url}/api/student`)
        .send(sampleStudent)
        .end((err, response) => {
          if (err) return done(err);
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(sampleStudent.name);
          expect(response.body.age).to.equal(sampleStudent.age);
          this.tempStudent = response.body;
        });
        done();
      });
    });

    describe('With an invalid object passed in.', () => {
      after(done => {
        if (this.tempStudent) {
          Student.deleteStudent(this.tempStudent.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('Should return a status code of 400', done => {
        request
        .post(`${url}/api/student`)
        .send({badObject: 'Yes it is'})
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(400);
          expect(response.body).to.equal(undefined);
          done();
        });
      });
    });
  });
});
