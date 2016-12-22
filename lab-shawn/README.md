# **RESTful API using Express**

## Overview

  This application is an HTTP RESTful API that uses express. It utilizes the GET,POST, & PUT methods to fetch, add, and update files in the file system.

## **How To Use API**

  * Clone this repository
  * Open a terminal and run `npm i` to install all the application dependencies

### **Run your server**

    `npm run start`

In a new terminal window/tab run your HTTP method commands

### **POST Request**
  `http POST localhost:[port number]/api/person name='[name]' gender='[gender]'`

### **GET Request**
  `http GET localhost:[port number]/api/person/[id]'`

### **DELETE Request**
  `http DELETE localhost:[port number]/api/person?id='[id]' name='[new name]' gender=[new gender]`
