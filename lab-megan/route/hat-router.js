'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('hat:hat-router');
const Hat = require('../model/hat.js');
const hatRouter = new Router();

hatRouter.post('/api/hat', jsonParser, function(req, res, next) {
  debug('POST: /api/hat');

  Hat.createHat(req.body)
  .then( hat => res.json(hat))
  .catch( err => next(err));
});

hatRouter.get('/api/hat/:id', function(req, res, next) {
  debug('GET: /api/hat/:id');

  Hat.fetchHat(req.params.id)
  .then( hat => res.json(hat))
  .catch( err => next(err));
});

hatRouter.get('/api/hat', function(req, res, next) {
  debug('GET: /api/hat');

  Hat.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

hatRouter.put('/api/hat', jsonParser, function(req, res, next) {
  debug('PUT: /api/hat');

  Hat.updateHat(req.query.id, req.body)
  .then( hat => res.json(hat))
  .catch(next);
});

module.exports = hatRouter;
