'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bev:bev-router');
const BEV = require('../model/bev.js');
const bevRouter = new Router();

bevRouter.post('/api/bev', jsonParser, function(req, res, next) {
  debug('POST: /api/bev');

  BEV.createVehicle(req.body)
  .then( bev => res.json(bev))
  .catch( err => next(err));
});

bevRouter.get('/api/bev/:id', function(req, res, next) {
  debug('GET: /api/bev/:id');

  BEV.retrieveVehicle(req.params.id)
  .then( bev => res.json(bev))
  .catch( err => next(err));
});

bevRouter.get('/api/bev', function(req, res, next) {
  debug('GET: /api/bev');

  BEV.retrieveAllVehicleIDs()
  .then( vehicleIDs => res.json(vehicleIDs))
  .catch( err => next(err));
});

bevRouter.put('/api/bev', jsonParser, function(req, res, next) {
  debug('PUT: /api/bev');

  BEV.updateVehicle(req.query.id, req.body)
  .then( bev => res.json(bev))
  .catch( err => next(err));
});

bevRouter.delete('/api/bev/:id', function(req, res, next) {
  debug('DELETE: /api/bev/:id');

  BEV.deleteVehicle(req.params.id)
  .then(res.send(204))
  .catch( err => next(err));
});

module.exports = bevRouter;
