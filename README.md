# Single Resource Express API Using Middleware

This project creates a single resource REST API using [Express.js](http://expressjs.com/) and allows users send POST, GET and PUT requests related
to dogs through the terminal.
When sending requests, use filepath `/api/dog` with a query and a response will return with appropriate message/content.
You will need to [HTTPie](https://httpie.org/) to send requests through the terminal.

## How to run

Install any Dependencies from the `package.json` file into the project root
directory. Using [Node.js](https://nodejs.org/), to create a `package.json` file, enter command `npm init` in the project root.
You can run the command `npm i` to install all depenenedcies. Make sure to have a `data` folder in the root directory.
This is where POST requests will write to.

## Running server

Run the `server.js` file using command `node server.js` or `npm start`. In terminal, you should see `Server up: 8000` or
port that is set in your environmental variable in terminal.

## Sending POST GET PUT Request

>POST Request

In an new terminal window, send a `POST` request by using the command
`http POST localhost:8000/api/dog name=<name> breed=<breed> color=<color>`.
Example: `http POST localhost:8000/api/dog name='Buddy' breed='Golden Retriever' color='brown'`
The POST request must include `name` `breed` and `color` parameters.
The successful response should return a JSON object with values you entered along with a unique `id` and
a status code of `200`. This will also create a new `.json` file into the `data` folder with the `id`
as the file name.

![POST request screenshot](/assets/post-response-screenshot.png)

>GET Request

In an new terminal window, send a `GET` request by using the command `http localhost:8000/api/dog/<id>`.
Example: `http localhost:8000/api/dog/00000000-c303-11e6-a4a3-73422de980bc`
The successful response should return a JSON object with a status of `200`.

![GET request screenshot](/assets/get-response-screenshot.png)

>PUT Request

In an new terminal window, send a `PUT` request by using the command
`http PUT localhost:8000/api/dog?id=<id> name=<updateName>`.
Example: `http PUT localhost:8000/api/dog?id=00000000-c303-11e6-a4a3-73422de980bc name='Buster'`
The a successful response should return a `200` status code with a json object
with the updated content.


## Closing server

In server terminal, enter `control` + `c`.
