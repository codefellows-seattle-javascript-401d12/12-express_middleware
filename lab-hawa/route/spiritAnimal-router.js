'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('spiritAnimal:spiritAnimal-router');
const SpiritAnimal = require('../model/spiritAnimal.js');
const spiritAnimalRouter = new Router();

spiritAnimalRouter.post('/api/spiritAnimal', jsonParser, function(req, res, next) {
  debug('POST: /api/spiritAnimal');

  SpiritAnimal.createSpiritAnimal(req.body)
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch( err => next(err));
});

spiritAnimalRouter.get('/api/spiritAnimal/:id', function(req, res, next) {
  debug('GET: /api/spiritAnimal/:id');

  SpiritAnimal.fetchSpiritAnimal(req.params.id)
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch( err => next(err));
});

spiritAnimalRouter.get('/api/spiritAnimal', function(req, res, next) {
  debug('GET: /api/spiritAnimal');

  SpiritAnimal.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

spiritAnimalRouter.put('/api/spiritAnimal', jsonParser, function(req, res, next) {
  debug('PUT: /api/spiritAnimal');

  SpiritAnimal.updateSpiritAnimal(req.query.id, req.body)
  .then( spiritAnimal => res.json(spiritAnimal))
  .catch(next);
});

module.exports = spiritAnimalRouter;
