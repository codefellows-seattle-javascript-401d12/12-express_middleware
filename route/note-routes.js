'use strict';

const debug = require('debug')('note:router');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
// const createError = require('http-errors');

const Note = require('../model/note.js');

const noteRouter = new Router();
module.exports = noteRouter;

noteRouter.post('/api/note', jsonParser, function(req, res, next){
  debug('POST: /api/note');

  Note.createNote(req.body)
  .then(note => res.json(note))
  .catch(next);
});

noteRouter.get('/api/note', function(req, res, next){
  debug('GET: /api/note');

  return Note.read(req.query.id)
  .then( note => res.json(note))
  .catch(next);
});


noteRouter.put('/api/note', jsonParser, function(req, res, next){
  debug('PUT: /api/note');

  Note.update(req.body)
  .then(note => res.json(note))
  .catch(next);
});

noteRouter.get('/api/note/availIDs', function(req, res, next){
  debug('availIDs: /api/note');

  Note.availIDs()
  .then( arr => res.json(arr))
  .catch(next);
});

noteRouter.delete( '/api/note', function(req, res, next){
  debug('DELETE: /api/note');

  Note.delete(req.query.id)
  .then( msg => res.json(msg))
  .catch(next);
});
