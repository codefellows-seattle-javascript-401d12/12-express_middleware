# Musical Atists RESTful api

## Overview
This is a RESTful API built with Express. The API gives the ability to add, view, update, and delete artists. The application utilizes Express to abstract the the http server process and Express.Router for handling requests.

## Getting started
To get started using this API
- Clone this repository
- Run `npm i`
- Once dependencies have been installed, run `node server.js`
  - As long as there are no issues, you should be alerted thate the server is up and running.
  - `npm test` will give you lots of detailed information about what's going on with app, provided by `morgan` and `debug`

## Usage
To make use of this API, by adding artists you like


* Download [httpie](http://httpie.org)

* To add and additional artist:
  * `http POST localhost:3000/api/artist? name=artistName genre=genre topHits=songName,songName`

* To view an artist:
  * `http localhost:3000/api/artist/uniqueIDassignedToTheArtist`
  
