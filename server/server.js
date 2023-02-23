"use strict";
exports.__esModule = true;
var messages_1 = require("./modular/messages");
var express = require('express');
require('dotenv').config(); // how can we get rid of require?
// Initilize express app and create the "database" that in our case is a simple array.
var app = express();
var msg_array = new Array;
// This makes it possible to pass json objects.
app.use(express.json());
/**
 * This is middleware that is called before every call to the backend.
 * Here we simply log the route and request method in console for debugging purposes.
 * This will not be visable on user end.
 */
app.use(function (req, res, next) {
    console.log(req.path, req.method);
    next();
});
// Routes
app.use('/api/messages', messages_1.router);
app.get('/', function (req, res) {
    res.json({ msg: 'good request' });
});
// Listen for requests, Default is port 4000 and defined in environment 
// as an environment variable to 
app.listen(process.env.PORT, function () {
    console.log("Listening on port", process.env.PORT);
});
