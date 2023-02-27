import { Request, Response, NextFunction } from 'express';
import { router } from './modular/messages';
const express = require('express');
require('dotenv').config(); // how can we get rid of require?

type message = {
    msg: string,
    name: string,
    id: number
}

// Initilize express app and create the "database" that in our case is a simple array.
const app = express();
const msg_array = new Array<message>;


// This makes it possible to pass json objects.
app.use(express.json());

/**
 * This is middleware that is called before every call to the backend. 
 * Here we simply log the route and request method in console for debugging purposes.
 * This will not be visable on user end.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use('/api/messages', router)

app.get('/', (req: Request, res: Response) => {
    res.json({msg: 'good request'});
});

// Listen for requests, Default is port 4000 and defined in environment 
// as an environment variable to 
app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
})