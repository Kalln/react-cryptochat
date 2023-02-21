import * as express from 'express';
require('dotenv').config();

import { router } from './routes/messages';
// Express app
const app = express();


// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// route
app.use('/api/messages', router);

app.get('/', (req, res) => {
    res.json({msg: 'welcome to our app'});
})

// Listen for requests

app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
})