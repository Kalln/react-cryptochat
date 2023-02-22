"use strict";
exports.__esModule = true;
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
/**
 * When GET method is called on 'http://localhost:4000/api/messages'
 * all previous sent messages by the POST request will be sent to the client.
 * This response is a simple array that we are using as our databse.
 */
app.get('/api/messages', function (req, res) {
    var all_messages = msg_array;
    res.status(200).json(all_messages);
});
/**
 * When the POST method is called on 'http://localhost:4000/api/messages'
 * we first deconstruct the body of the request, we expect it to be a json,
 * that contains a message and a username. The ID is needed for the react
 * component so that is also created in getID function.
 *
 * We have this in a try catch, so if any errors occurs during the add to the
 * database we send back code 400 with the error. If the add is success
 * we simply return with code 200 (everything ok) and with data that is added to
 * the databse.
 */
app.post('/api/messages', function (req, res) {
    var _a = req.body, messagestring = _a.messagestring, username = _a.username;
    try {
        var msg = { msg: messagestring, name: username, id: 1 };
        msg_array.push(msg);
        res.status(200).json(msg);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// ONLY FOR TEST, WILL BE REMOVED BEFORE PRODUCTION
app.get('/', function (req, res) {
    res.json({ msg: 'welcome to our app' });
});
// Listen for requests, Default is port 4000 and defined in environment 
// as an environment variable to 
app.listen(process.env.PORT, function () {
    console.log("Listening on port", process.env.PORT);
});
