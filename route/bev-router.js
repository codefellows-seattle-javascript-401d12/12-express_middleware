'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bev:bev-router');
const BEV = require('../model/bev.js');
const bevRouter = new Router();

bevRouter.post('api/bev', jsonParser, function(req, res, next) {
  debug('POST: /api/bev');

  BEV.createVehicle(req.body)
  .then( bev => res.json(bev))
  .catch( err => next(err));
});

bevRouter.get('api/bev/:id', function(req, res, next) {
  debug('GET: /api/bev/:id');

  BEV.retrieveVehicle(req.params.id)
  .then( bev => res.json(bev))
  .catch( err => next(err));
});
