"use strict";
exports.__esModule = true;
var cors = require("cors");
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var jsonParser = bodyParser.json();
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
app.use(express.static(path.resolve(__dirname, '../build')));
//app.use(cors);
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
var options = { origin: allowedOrigins };
app.use(cors(options));
//app.use(cors());
// Gets all message.
app.get('/getAllMessages', function (req, res) {
    //res.json({msg: 'this is from /api. '});
    res.json({ "msg": 1 });
    //res.send('Get all messages');
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// post chat message to server.
app.post('/postChat', urlencodedParser, function (req, res) {
    res.json({ msg: 'this is from /api. ' });
    //console.log(req.body);
    //console.log(req)
    //res.send("hello");
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
