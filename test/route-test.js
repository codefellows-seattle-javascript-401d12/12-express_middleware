'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Note = require('../model/note.js');
const url = 'localhost:3000/api/note';

require('../server.js');

const sampleNote ={
  name:'example',
  content: 'sample content for test'
};

describe('GET: test', function(){
  describe('get valid note with a valid body and from the file system', function(){
    before( done => {
      Note.createNote(sampleNote)
      .then( note => {
        this.tempNote = note;
        done();
      })
      .catch( err => done(err));
    });

    after(done => {
      Note.delete(this.tempNote.id)
      .then( () => done())
      .catch(done);
    });
    it('should get a note from file system', done => {
      request.get(`${url}?id=${this.tempNote.id}`)
      .end((err, res) => {
        if(err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempNote.id);
        expect(res.body.name).to.equal(this.tempNote.name);
        expect(res.body.content).to.equal(this.tempNote.content);
        done();
      });
    });
  });
});

describe('POST: /api/note', function(){
  describe('generate note', function(){
    after(done => {
      Note.delete(this.id)
      .then( () => done())
      .catch(done);
    });
    it('it should generate a note', done => {
      request.post(`${url}`)
      .send({name:'example', content: 'sample content for test'})
      .end((err, res) => {
        if(err) return done(err);

        this.id = res.body.id;
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal(sampleNote.name);
        expect(res.body).to.have.property('content');
        expect(res.body.content).to.equal(sampleNote.content);
        done();
      });
    });
  });
});

describe('PUT: /api/note', function(){
  describe('it should update the context', function(){
    before( done => {
      Note.createNote(sampleNote)
      .then( note => {
        this.tempNote = note;
        done();
      })
      .catch( err => done(err));
    });

    after(done => {
      Note.delete(this.tempNote.id)
      .then( () => done())
      .catch(done);
    });
    it('should update ', done => {
      request.put(`${url}`)
      .send({name:'update example', content: 'update sample content for test', id: `${this.tempNote.id}`})
      .end( (err, res) => {
        if(err) return done(err);

        expect(res.body.id).to.equal(this.tempNote.id);
        expect(res.body.name).to.not.equal(this.tempNote.name);
        expect(res.body.name).to.equal('update example');
        expect(res.body.content).to.not.equal(this.tempNote.content);
        expect(res.body.content).to.equal('update sample content for test');
        done();
      });
    });
  });

});
