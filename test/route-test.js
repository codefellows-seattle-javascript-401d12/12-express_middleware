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
        console.log('tempNote.id:- ', this.tempNote.id, '\nres.id:- ', res.body);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempNote.id);
        expect(res.body.name).to.equal(this.tempNote.name);
        expect(res.body.content).to.equal(this.tempNote.content);
        done();
      });
    });
  });
});
