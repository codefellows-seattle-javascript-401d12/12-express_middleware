'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Student = require('../model/student-constructor.js');
const PORT = process.env.PORT || 8080;
const url = `http://localhost:${PORT}`;

require('../server.js');

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
          done();
        });
      });
    });

    describe('With an invalid object passed in.', () => {
      it('Should return a status code of 400', done => {
        request
        .post(`${url}/api/student`)
        .send({badObject: 'Yes it is'})
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(400);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });
  });

  describe('GET routes.', () => {
    describe('With a valid ID passed in.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student => {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      after(done => {
        Student.deleteStudent(this.tempStudent.id)
        .then(() => done())
        .catch(done);
      });

      it('Should return a student.', done => {
        request
        .get(`${url}/api/student/${this.tempStudent.id}`)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(sampleStudent.name);
          expect(response.body.age).to.equal(sampleStudent.age);
          done();
        });
      });
    });

    describe('With an invalid ID passed in.', () => {
      it('Should respond with a 404 status.', done => {
        request
        .get(`${url}/api/student/69`)
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(404);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });

    describe('With no ID passed in.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student => {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      after(done => {
        if (this.tempStudent) {
          Student.deleteStudent(this.tempStudent.id)
          .then(() => done())
          .catch(done);
        }
      });

      it('Should respond with an array of all IDs.', done => {
        request
        .get(`${url}/api/student`)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.at.least(1);
          done();
        });
      });
    });
  });

  describe('PUT routes.', () => {
    describe('With a valid ID and content passed in.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student => {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      after(done => {
        Student.deleteStudent(this.tempStudent.id)
        .then(() => done())
        .catch(done);
      });

      it('Should return an updated student.', done => {
        request
        .put(`${url}/api/student/${this.tempStudent.id}`)
        .send({name: 'Bob', age: 40})
        .end((err, response) => {
          if (err) return done(err);
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('Bob');
          expect(response.body.age).to.equal(40);
          expect(response.body.id).to.equal(this.tempStudent.id);
          done();
        });
      });
    });

    describe('With a valid ID, but no content.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student => {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      after(done => {
        Student.deleteStudent(this.tempStudent.id)
        .then(() => done())
        .catch(done);
      });

      it('Should return a 400 error.', done => {
        request
        .put(`${url}/api/student/${this.tempStudent.id}`)
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(400);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });

    describe('With content, but not a valid ID.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student =>  {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      after(done => {
        Student.deleteStudent(this.tempStudent.id)
        .then(() => done())
        .catch(done);
      });

      it('Should return a 404 error.', done => {
        request
        .put(`${url}/api/student/69`)
        .send({name: 'Steven', age: '88'})
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(404);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });
  });

  describe('DELETE routes.', () => {
    describe('With a valid ID.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student => {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      it('Should return a 204 status.', done => {
        request
        .delete(`${url}/api/student/${this.tempStudent.id}`)
        .end((err, response) => {
          if (err) return done(err);
          expect(response.status).to.equal(204);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });

    describe('With an invalid ID.', () => {
      before(done => {
        Student.createStudent(sampleStudent)
        .then(student => {
          this.tempStudent = student;
          done();
        })
        .catch(done);
      });

      after(done => {
        Student.deleteStudent(this.tempStudent.id)
        .then(() => done())
        .catch(done);
      });

      it('Should return a 404 error.', done => {
        request
        .delete(`${url}/api/student/69`)
        .end((err, response) => {
          expect(err).to.be.an('error');
          expect(response.status).to.equal(404);
          expect(response.body.name).to.equal(undefined);
          done();
        });
      });
    });
  });
});
