import { Request, Express, Response } from 'express';
import * as cors from 'cors';

type message = {
    msg: string,
    name: string,
    date: Date
};
const express = require('express');
const path = require('path');   


const app: Express = express();
const PORT: number = 8000;


/**
 * INPUT
 */
const test_msg: message= {
    msg: "Hello everyone!",
    name: "Anonymous",
    date: new Date()
};

//app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors);
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));

// Gets all message.
app.get('/getAllMessages', (req: Request, res: Response) => {
    //res.json({msg: 'this is from /api. '});
    res.json(test_msg);
    //res.send('Get all messages');
});


// post chat message to server.
app.post('/postChat', (req: Request, res: Response) => {
    //res.json({msg: 'this is from /api. '});
    res.json(req);
    console.log(req);
    //res.send('Get all messages');
})


/**
 * FOR FUTURE:
 * DELETE MESSAGE
 * GET ONE MESSAGE?
 */

app.listen(PORT, () => {
    console.log('[SERVER]: Server is running on port:', PORT);
});