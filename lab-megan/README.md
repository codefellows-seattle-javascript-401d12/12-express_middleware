### ABOUT THIS PROJECT

This is a simple Express router built as part of the Code Fellows 401 JavaScript class. It uses Express to handle middleware and routing, in this case I'm keeping track of hats with a color and style.

### HOW TO GET THE API RUNNING

Clone this repository.
```JavaScript
cd lab-megan

npm i
```
To get needed Node dependencies.

In one terminal window:
```JavaScript
nmp run start
```

### HOW TO USE THE API

With this API you can create, view and delete the records of various hat. To do so get the server running in a terminal window and open a second terminal window and do the following

To create a hat
`http POST localhost:3000/api/hat color='<a color>' style='<a style>'`
This will return your color, style and a unique id.

Note: If your server shows it is running on a different port please use that one instead.


To view the record of a hat
`http localhost:3000/api/hat?id=<the id of a known hat>`
This will return the color and style of the requested id.

To delete the record of a hat
`http DELETE localchost:3000/api/hat?id=<the id of a known hat>`
This will return a 204 message to confirm any record of the had has been deleted.

### HOW TO INCLUDE IN YOUR PROJECT

```JavaScript
npm i -D chai mocha superagent
npm run test
```
