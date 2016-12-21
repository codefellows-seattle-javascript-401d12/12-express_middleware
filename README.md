## Express Single Resource API with Middleware

This is a fun project where we created refactored our Vanilla REST API to use Express.js and Express middleware! Woo!

### Get the Project Running

To get this project running, type the following in your command line:

1. `git clone https://github.com/brittdawn/12-express_middleware.git`
2. `cd 12-express_middleware`
3. `npm i`
4. `brew install httpie`
5. `node server.js` or `npm start`

You will now see the phrase "server is up: 3000" if you have not already specified a port number.

### Test the Vanilla REST API (POST/PUT)

1. Open a new terminal located at the root of this project and type `http POST localhost:3000/api/song title="Respect" description="An amazing song."`
2. You should get a JSON response with a description, id, and title with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 96
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 18:41:25 GMT
ETag: W/"60-bWD0Owj0Aw4hPe83CM1NRA"
X-Powered-By: Express

{
    "description": "An amazing song.",
    "id": "139cc690-c7ad-11e6-b412-6fab5b943af5",
    "title": "Respect"
}
```

To use the PUT request and update a particular song title/description, you can do the following: `http PUT localhost:3000/api/song/139cc690-c7ad-11e6-b412-6fab5b943af5 title="Fancy" description="This song makes little sense."`

### Test the Vanilla REST API (GET)

After making a POST, you can make a GET request.

1. Copy the id from your POST request above. Add it as a querystring to your GET request, like this example: `http localhost:3000/api/song/139cc690-c7ad-11e6-b412-6fab5b943af5`

2. You should get a JSON response with a description, id, and title with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 96
Content-Type: application/json; charset=utf-8
Date: Wed, 21 Dec 2016 18:42:37 GMT
ETag: W/"60-bWD0Owj0Aw4hPe83CM1NRA"
X-Powered-By: Express

{
    "description": "An amazing song.",
    "id": "139cc690-c7ad-11e6-b412-6fab5b943af5",
    "title": "Respect"
}
```

To GET all of the songs, do the following: `http localhost:3000/api/song`.

### Test the Vanilla REST API (DELETE)

After making a GET or a POST, you can make a DELETE request.

1. Copy the id from your POST/GET request above. Add it as a query string to your DELETE request, like this example: `http DELETE localhost:3000/api/song/139cc690-c7ad-11e6-b412-6fab5b943af5`

2. You should get a JSON response with a description, id, and title, like this example:

``` javascript
HTTP/1.1 204 No Content
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Date: Wed, 21 Dec 2016 18:47:43 GMT
X-Powered-By: Express
```

3. If you try a GET request now for the item you deleted, it should not be found. For example, with the item above: `http localhost:3000/api/song/139cc690-c7ad-11e6-b412-6fab5b943af5`. Now if you will get this `404` (not found) response, because you deleted the item, yo:

``` javascript
HTTP/1.1 404 Not Found
Access-Control-Allow-Headers: *
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 13
Content-Type: text/html; charset=utf-8
Date: Wed, 21 Dec 2016 18:47:51 GMT
ETag: W/"d-8ImJlDOBcq5A9PkBq5sbQw"
X-Powered-By: Express

NotFoundError
```
