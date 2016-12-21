# Express Single Resource API

### About
The Express Single Resource API is a simple RESTful API that utilizes Express for server creation and routing. All testing is handled via mocha, chai, and superagent. The API handles 3 types of RESTful Methods: `GET`, `POST`, `PUT`, and `DELETE`. The API is built to accept two pieces of data, location and rating, and stores them locally in the file system to create a layer of persistence. Each `POST` entry will also be assigned a unique id via `node-uuid`. The unique id allows the user to then either `GET`, `PUT`, or `DELETE` files by using the unique id.

### Current Version (0.1.0)
The current version of this application will persist user data locally on the users file system. Users can `POST`, `GET`, `PUT`, and `DELETE` files.

### Setting up Express Single Resource API on your local machine
* Fork this repo
* git clone the forked copy to your local machine
* **Node** is required to run the server. Confirm you have node installed on your local machine by typing `npm -v` into your terminal. If you don't have node installed please follow the instructions here.
* Install the dependencies by running `npm i`.
* The server is set up to run using `npm scripts` so to turn on the server and run the program you will need to run `npm run start` in the terminal.
* When you start the server the port number should be printed to the terminal console. You will need to provide this to any users wanting to connect.

### API Commands
* `POST` - create file: `http POST localhost:<YOUR PORT NUMBER>/api/ski location='<YOUR LOCATION DATA>' rating=<NUMBER>`
 * This will return a header with status code and a JSON representation of the data you just added.
 * The POST will write a file to the ../data/skiData/ file saved with uuid as the file name.
* `GET` - unique file: `http localhost:<YOUR PORT NUMBER>/api/ski/<ID OF OBJECT YOU WANT BACK>`
 * This will return a header with status code and a JSON representation of the data you just requested.
 * If you request a file via and id that does not exist then the api will return 404.
 * If you run a bad GET method and do not pass an id the api will return 400.
* `GET` - all files : `http localhost:<YOUR PORT NUMBER>/api/ski`
 * This will return a header with a status code and array of all unique IDs for all data files.
* `PUT` - unique file: `http PUT localhost:<YOUR PORT NUMBER>/api/ski/<ID OF OBJECT YOU WANT TO UPDATE> location='<NEW DATA>' rating='<NEW DATA>'`
 * This will update the specific data file you have requested with the provided data and return a status of 200 if successful.
* `DELETE` - unique file: `http DELETE localhost:<YOUR PORT NUMBER>/api/ski/<ID OF OBJECT YOU WANT TO DELETE>`
 * This will return a header with a status code of 204.
 * The object deleted will be removed for the database.
* `mocha`: this will run tests set up to validate that the code is working as expected.
at the time of publication of this README.md all tests are currently passing.
* `gulp`: this will run the gulp file which includes tasks for `eslint` and `test`.
 * `test` task will perform the same tests that would be run if `mocha` was run.
