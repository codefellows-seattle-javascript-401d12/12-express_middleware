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


//TODO: set up get route by :id

//TODO: set up get route all ids

//TODO: set up put route

//TODO: add module.exports for ski router
