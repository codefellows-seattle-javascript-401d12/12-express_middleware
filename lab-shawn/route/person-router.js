'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('person:person-router')
const Person = require('../model/person.js');
const personRouter = new Router();

personRouter.post('/api/person', jsonParser, function(req,res,next){
  debug('POST: /api/person');

  Person.createPerson(req.body)
  .then( person => res.json(person ))
  .catch(next);
});

personRouter.get('/api/person/:id', function(req,res,next){
  debug('GET: /api/person/:id');

  Person.fetchPerson(req.params.id)
  .then( person => res.json(person))
  .catch(next);
});

personRouter.get('/api/person', function(req,res,next){
  debug('GET: /api/person');

  Person.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

personRouter.put('/api/person',jsonParser, function(req,res,next){
  debug('PUT: /api/person');

  Person.updatePerson(req.query.id,req.body)
  .then(person => res.json(person))
  .catch(next);
});

module.exports = personRouter;
