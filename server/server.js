"use strict";
exports.__esModule = true;
var cors = require("cors");
var express = require('express');
var path = require('path');
var app = express();
var PORT = 8000;
/**
 * INPUT
 */
var test_msg = {
    msg: "Hello everyone!",
    name: "Anonymous",
    date: new Date()
};
//app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors);
app.use(express.json());
var allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
var options = {
    origin: allowedOrigins
};
app.use(cors(options));
// Gets all message.
app.get('/getAllMessages', function (req, res) {
    //res.json({msg: 'this is from /api. '});
    res.json(test_msg);
    //res.send('Get all messages');
});
// post chat message to server.
app.post('/postChat', function (req, res) {
    //res.json({msg: 'this is from /api. '});
    res.json(req);
    console.log(req);
    //res.send('Get all messages');
});
/**
 * FOR FUTURE:
 * DELETE MESSAGE
 * GET ONE MESSAGE?
 */
app.listen(PORT, function () {
    console.log('[SERVER]: Server is running on port:', PORT);
});
