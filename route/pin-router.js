'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('pin:pin-router');
const Pin = require('../model/pin.js');
const pinRouter = new Router();

pinRouter.post('/api/pin', jsonParser, function(req, res, next) {
  debug('POST: /api/pin');

  Pin.createPin(req.body)
  .then(pin => res.json(pin))
  .catch(err => next(err));
});

pinRouter.get('/api/pin/:id', function(req, res, next) {
  debug('GET: /api/pin/:id');

  Pin.fetchPin(req.params.id)
  .then(pin => res.json(pin))
  .catch(err => next(err));
});

pinRouter.get('/api/pin', function(req, res, next) {
  debug('GET: /api/pin');

  Pin.fetchIDs()
  .then(ids => res.json(ids))
  .catch(next);
});

pinRouter.put('/api/pin', jsonParser, function(req, res, next) {
  debug('PUT: /api/pin');

  Pin.updatePin(req.query.id, req.body)
  .then(pin => res.json(pin))
  .catch(next);
});

module.exports = pinRouter;
