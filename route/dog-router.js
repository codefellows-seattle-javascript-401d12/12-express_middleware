'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('dogs:dog-router');
const Dog = require('../model/dogs.js');
const dogRouter = new Router();

dogRouter.post('/api/dog', jsonParser, function(req, res, next) {
  debug('POST: /api/dog');

  Dog.createDog(req.body)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

dogRouter.get('/api/dog/:id', function(req, res, next) {
  debug('GET: /api/dog/:id');

  Dog.fetchDog(req.params.id)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

dogRouter.put('/api/dog', jsonParser, function(req, res, next) {
  debug('PUT: /api/dog');

  Dog.updateDog(req.query.id, req.body)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

dogRouter.get('/api/dog', function(req, res, next) {
  debug('GET: /api/dog');

  Dog.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

module.exports = dogRouter;
