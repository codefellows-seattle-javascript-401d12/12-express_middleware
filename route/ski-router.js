'use strict';

const debug = require('debug')('ski:ski-router');
const Router = require('express').Router;
const jsonparser = require('body-parser').json();
const SkiData = require('../model/ski-data.js');
const skiRouter = new Router();

skiRouter.post('/api/ski', jsonparser, function(req, res, next) {
  debug('POST: /api/ski');

  SkiData.createData(req.body)
    .then( skiData => res.json(skiData))
    .catch(next);
});

skiRouter.get('/api/ski/:id', function(req, res, next) {
  debug('GET: /api/ski/:id');

  SkiData.getData(req.params.id)
    .then( skiData => res.json(skiData))
    .catch(next);
});

skiRouter.get('/api/ski', function(req, res, next) {
  debug('GET: /api/ski');

  SkiData.getAllData()
    .then( skiData => res.json(skiData))
    .catch(next);
});

skiRouter.put('/api/ski/:id', jsonparser, function(req, res, next) {
  debug('PUT: /api/ski');

  SkiData.updateData(req.params.id, req.body)
    .then( skiData => res.json(skiData))
    .catch(next);
});

module.exports = skiRouter;
