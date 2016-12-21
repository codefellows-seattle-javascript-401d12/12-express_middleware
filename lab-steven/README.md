#Single-Resource API Using Express
###Steven Bateman's lab 12 assignment for JS 401

###Overview
This is a simple, single-resource app that will allow you to practice GET, POST, PUT, and DELETE requests against a single-resource API that collects data on students.

###Installation
To install this app, clone down this repository, navigate to the `lab-steven` directory, then run `npm i`.

###Usage
To start your server, run `npm start`. If you are not interested in seeing debugging messages, you can simply run `node server.js`. You should see a message that says, "Server running on port <port#>".

From there, you can open up another terminal window and connect to your server using HTTPIE. To install HTTPIE:
* For Mac, run `brew install httpie`
* For linux, run `sudo apt install httpie`

###POST requests
There is a layer of persistence with this app through using the file system module, so you will be unable to GET or DELETE any students without first POSTing some. In order to POST a student, you will need to make a POST request to `/api/student` and pass in a JSON object with at least a name and age field. You can include any additional fields as desired, but you must at least have a name and age.

* Example: `http POST localhost:8080/api/student name="Steven" age="30" badass="Definitely"`

###PUT requests
If you want to update a particular student, simply make a request to the API and pass in the student's ID, along with the content you'd like to update.

* Example: `http PUT localhost:8080/api/student/0238b-a97sdf-fdhd-f3893 name="Weasel" age="45"` (will update the student with that ID to have a new name and age of Weasel and 45)

###GET requests
You can make a get request with no headers to receive a list of all IDs that have been POSTed, or you can pass in an ID through the URL to get back a specific student.

* Example: `http localhost:8080/api/student` (returns all student IDs)
* Example: `http localhost:8080/api/student/0238b-a97sdf-fdhd-f3893` (will return a student with that particular ID)

###DELETE requests
You can DELETE a student the same way you make a GET request, by passing in an ID. To delete our example student from the GET request subsection, we could do the following:

* Example: `http DELETE localhost:8080/api/student/0238b-a97sdf-fdhd-f3893`

All students will be stored in the data/student directory until they are DELETED or manually `rm`ed.
