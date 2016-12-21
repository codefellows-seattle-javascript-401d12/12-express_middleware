'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artist:artist-router.js');
const Artist = require('../model/artist.js');
const artistRouter = new Router();
