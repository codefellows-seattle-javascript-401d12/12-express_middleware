#Lab 12 - Single Resource Express API with middleware!

##About
This is a demo HTTP server using the express framework. You can GET, POST, PUT, and DELETE jokes which are stored on disk. Each joke is comprised of a setup string, a punchline string, and a random ID which is assigned when the joke is stored.

##Getting started
1. Install with `npm i`
2. Start in normal mode with `npm start` or debug mode with `npm run debug`.

Server runs on `$PORT` or defaults to 2000.

##Usage
* Store a joke:
 * `http post localhost:2000/api/joke setup=<setup> punchline=<punchline>`
* Enumerate stored jokes as an array of joke IDs:
 * `http get localhost:2000/api/joke`
* Retrieve a joke:
 * `http get localhost:2000/api/joke?id=<id>`
* Update a joke:
 * `http put localhost:2000/api/joke?id=<id> setup=<new setup> punchline=<new punchline>`
* Delete a joke:
 * `http delete localhost:2000/api/joke/id=<id>`
