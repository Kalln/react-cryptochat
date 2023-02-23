import {Express,Request, Response, Router} from 'express';
import { router } from '../modular/messages';
const supertest = require('supertest');
const express = require('express');
require('dotenv').config();

/**
 * TEST API
 */

function create_test_app() {
    const app = express(); 

    /**
     * routes
     * heavily inspired: https://alexanderpaterson.com/posts/how-to-start-unit-testing-your-express-apps
     */
    const messages_router = Router();
    messages_router.route('/').get((req, res) => {
        return res.json({goodCall: true});
    });

    app.use(router);
    return app;
}

const apptest = express();
apptest.use('/', router);

const sampleRequest = {
    messagestring: "hello",
    username: "test"
};

// START SERVER


// TEST POST METHOD
test('POST method works (message sent)', async () => {
    const res = await supertest.request(apptest).get('/');
    expect(res.statusCode).toBe(200);
    
});

// TEST GET METHOD
test('GET method works (got all messages)', async () => {
    const app = create_test_app();
    await supertest(app).post('/api/messages').send(sampleRequest).expect(200);
});