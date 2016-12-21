'use strict';

const Router = require('express').Router; //express's router class
const jsonParser = require('body-parser').json(); //called because we will pass as middleware?
const debug = require('debug')('note:note-router');
const Note = require('../model/note.js');
const noteRouter = new Router();

noteRouter.post('/api/note', jsonParser, function(req, res, next) {
  debug('POST: /api/note');

  Note.createNote(req.body)
  .then( note => res.json(note))
  .catch( err => next(err));
});

noteRouter.get('/api/note/:id', function(req, res, next) {
  debug('GET: /api/note/:id');

  Note.fetchNote(req.params.id)
  .then( note => res.json(note))
  .catch( err => next(err));
});

noteRouter.get('/api/note', function(req, res, next) {
  debug('GET: /api/note');

  Note.enumerate()
  .then( list => res.json(list))
  .catch(next); //will next(err) automatically
});

noteRouter.put('/api/note/', jsonParser, function(req, res, next) {
  debug('PUT: /api/note');

  console.log(req.query);
  Note.updateNote(req.query.id, req.body) //doesn't use parameters like above.
  .then( note => res.json(note))
  .catch(next);
});

module.exports = noteRouter; //this is an instantiated Router object, with our routes added.
