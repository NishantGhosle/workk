## Module system

import export module with commom js, module

## fs - file system is to interact with the filesystem to read, write, and manipulate files and directories, which provides both synchronous and asynchronous methods for file operations.

fs.reactFileSync(); - this is sync
fe.readFile(); - this is async

## npm

node package manager
dependency - Needed in production
dev dependency - Needed only during development
4.18.3 (major,minor,bug) version

#Express JS

Application Methods: app.use().
Request Methods: Handle client requests.
Response Methods: res.send(), res.sendFile(), res.json(), res.sendStatus(404).
Middleware Methods: Modify requests/responses.
Router Methods: Define route handlers.

#HTTP Request Types
GET, POST, PUT (overwrite changes), DELETE, PATCH (overwite which is required).

#Request properties
req.query: Query parameters.
req.body: Request body data .
req.params: URL parameters .

Serve static files using express.static(directory).
Default file: index.html.

# Sending Data from Client to Server

Query String
Format: key=value pairs in the URL.

Request Params
Format: Values separated by /.

Request Body
Format: Data sent in the body of the request.

# REST API using Express

get - get all data
post - create new data
put - overwrite the data
patch - partially change the data
delete - delete data

# Model View Controller (MVC) and File structure

Model: Manages data and business logic.
View: Displays data and handles user interaction.
Controller: Processes user input and interacts with the Model and View.

# Mongoose

Types Mongoose Schema:

String
Number
Date
Boolean
Mixed
ObjectId
Array

# Frontend integration

Sending data from frontend to backend
Installing CORS package to allow cross origin request from React JS server to NodeJS server as they are on different hosts.

# Server Side Rendering

Done by ejs but here are few more like pug and handlebars

By using <% %> syntax
output with <%= %>

# Authentication with JWT

Using jsonwebtoken packeage for this
3 parts of JWT - headers, payload, signature
bcrypt for password hashing

# Events, Streams, Sockets - socket.io

Mongoose query for sorting
like -1 for bottom to top seeing results
On the basis of product, title etc.

WebSockets are powerful tools for creating dynamic, real-time web applications, providing a more efficient and responsive communication method compared to traditional HTTP-based approaches.
