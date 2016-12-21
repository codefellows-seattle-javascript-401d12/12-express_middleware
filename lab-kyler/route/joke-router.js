'use strict';

const Router = require('express').Router; //express's router class
const jsonParser = require('body-parser').json(); //called because we will pass as middleware?
const debug = require('debug')('joke:joke-router');
const Joke = require('../model/joke.js');
const jokeRouter = new Router();

jokeRouter.post('/api/joke', jsonParser, function(req, res, next) {
  debug('POST: /api/joke');

  Joke.createJoke(req.body)
  .then( joke => res.json(joke))
  .catch( err => next(err));
});

jokeRouter.get('/api/joke/:id/', function(req, res, next) {
  debug('GET: /api/joke/:id/');

  Joke.fetchJoke(req.params.id)
  .then( joke => res.json(joke))
  .catch( err => next(err));
});

jokeRouter.get('/api/joke', function(req, res, next) {
  debug('GET: /api/joke');

  Joke.enumerate()
  .then( list => res.json(list))
  .catch(next); //will next(err) automatically
});

jokeRouter.put('/api/joke/', jsonParser, function(req, res, next) {
  debug('PUT: /api/joke');

  Joke.updateJoke(req.query.id, req.body) //doesn't use parameters like above.
  .then( joke => res.json(joke))
  .catch(next);
});

jokeRouter.delete('/api/joke/:id', function(req, res, next) {
  debug('DELETE: /api/joke/:id');

  Joke.deleteJoke(req.params.id) //doesn't use parameters like above.
  .then( joke => res.json(joke))
  .catch(next);
});

module.exports = jokeRouter; //this is an instantiated Router object, with our routes added.
