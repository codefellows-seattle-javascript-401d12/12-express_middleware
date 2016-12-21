# Express Single Resource API with middleware

This express single resource API allows a user to make GET, PUT, and POST requests to the Artist object. The user can POST a new Artist name and genre, receive an id, and can get the Artist by that id.

### Set-Up

In your Terminal

```sh
$ git clone <repository url>
$ cd 12-express_middleware
$ npm i
```
This will install the proper dependencies. You should receive the following in your package.json file:

```sh
"dependencies": {
  "bluebird": "^3.4.6",
  "body-parser": "^1.15.2",
  "chai": "^3.5.0",
  "debug": "^2.4.5",
  "express": "^4.14.0",
  "http-errors": "^1.5.1",
  "mocha": "^3.2.0",
  "morgan": "^1.7.0",
  "node-uuid": "^1.4.7",
  "superagent": "^3.3.1"
}
```

Run `node server.js`  or to start your server. Or run `npm run start` to include debug while starting your server. You will receive a response of 'server live on PORT: `<PORT>`'


### Use

Making a POST request
* Run `http POST localhost:<PORT>/api/artist name='<name>' genre='<genre>'`
* This will update the Artist object to show `name:` `genre:` and `id:`
* You will also receive a status code of 200.

Example:
```sh
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 79
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 01:42:55 GMT
ETag: W/"4f-XrtcY5ELsfZ6vIlKoUtB+Q"
X-Powered-By: Express

{
    "genre": "Punk",
    "id": "cb000020-c71e-11e6-b55a-156f3ac3297a",
    "name": "Blink-182"
}
```

Making a GET request
* Run `http localhost:<PORT>/api/artist?id=<id>`
* You must copy and paste the id from the post request.
* You will also receive a status code of 200.

Example:
```sh
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 40
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 01:43:28 GMT
ETag: W/"28-ivjiv1YIQTFvK7z9Yn5eIA"
X-Powered-By: Express

[
    "cb000020-c71e-11e6-b55a-156f3ac3297a"
]
```

* If you run `http localhost:<PORT>/api/artist` you should receive a 400 status code, and a message of 'bad request'

* If you run `http POST localhost:<PORT>/api/artist` you should receive a 400 status code, and a message of 'bad request'
