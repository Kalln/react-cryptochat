const request = require('supertest');

const host = 'http://localhost:4000/api/messages';
const correct_post = {messagearray: [2, 45, 23], username: "test", user_id: Math.floor(100000 + Math.random() * 900000)}
/**
 * TEST API
 * 
 * TO RUN THE TEST: 
 * 'npm run test'
 * otherwise the test will not work properly, the script run is: 
 * "tsc --strict *.ts; node server.js & jest --runInBand" (located in package.json)
 */

afterAll(() => {
    //shutdown the server process.
    const shutdown = async () => {
        await fetch("http://localhost:4000/shutdown", {
            method: "POST"
        });
    }
    shutdown();
});

describe('POST/GET requests:', () => {

    describe('(empty) GET requests:', () => {
        test('GET return empty', async () => {
            // GET request should return empty as the database is empty.
            const response  = await request(host).get('/');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual([]);
            expect(response.status).not.toEqual(400);
    
        });
    });


    describe('POST request: ', () => {
        test('was successful', async () => {
            const response = await request(host).post('/').send(correct_post);
            expect(response.status).toEqual(200);;
        });
    });
    

    describe('(non empty) GET request:', () => {

        let response;
        beforeAll(async () => {
            response = await request(host).get('/');
            console.log(response.body);
        });
    
        test('returns code 200', () => {
            expect(response.status).toEqual(200);
        });
        test('returns same message array', () => {
            expect(response.body[0].msg).toEqual(correct_post.messagearray);
        });
        test('returns same username', () => {
            expect(response.body[0].name).toEqual(correct_post.username);
        });
        test('returns same user_id', () => {
            expect(response.body[0].user_id).toEqual(correct_post.user_id);
        });
        test('returns correct size on msg_id', () => {
            expect(
                String(response.body[0].msg_id).length === 12 ||
                String(response.body[0].msg_id).length === 11 
                ).toBe(true);
        });
        test('msg_id has correct first 6 numbers', () => {
            expect(Number(String(response.body[0].msg_id).slice(0, 6)))
            .toEqual(response.body[0].user_id);
        });
        test('createdAt timestamp has correct type (string)', () => {
            expect(typeof(response.body[0].createdAt)).toEqual('string');
        });
    });
});

describe('API error handler', () => {

    const wrong_message = {messagearray: "test", username: "test", user_id: Math.floor(100000 + Math.random() * 900000)}
    const wrong_username = {messagearray: [10, 10], username: 123, user_id: Math.floor(100000 + Math.random() * 900000)};
    const empty_message = {username: "test", user_id: Math.floor(100000 + Math.random() * 900000)}
    const empty_username = {messagearray: [10, 10], user_id: Math.floor(100000 + Math.random() * 900000)}; 

    test('returns code 400 when message has wrong type', async() => {
        const response = await request(host).post('/').send(wrong_username);
        expect(response.status).toEqual(400);
    });
    test('returns code 400 when username has wrong type', async () => {
        const response = await request(host).post('/').send(wrong_message);
        expect(response.status).toEqual(400);
    });
    test('returns code 400 when message empty', async () => {
        const response = await request(host).post('/').send(empty_message);
        expect(response.status).toEqual(400);
    });
    test('returns code 400 when username empty', async () => {
        const response = await request(host).post('/').send(empty_username);
        expect(response.status).toEqual(400);
    });
    // check correct error message.
    test('returns correct error message when message has wrong type', async() => {
        const response = await request(host).post('/').send(wrong_message);
        expect(response.body.error)
        .toEqual('Something went wrong, the message had wrong format, write a new message');
    });
    test('returns correct error message when username has wrong type', async () => {
        const response = await request(host).post('/').send(wrong_username);
        expect(response.body.error)
        .toEqual('Something went wrong, the username had wrong format, choose a new name');
    });
    test('returns correct error message when message empty', async () => {
        const response = await request(host).post('/').send(empty_message);
        expect(response.body.error)
        .toEqual('No message was detected, try again');
    });
    test('returns correct error message when username empty', async () => {
        const response = await request(host).post('/').send(empty_username);
        expect(response.body.error)
        .toEqual('No name was chosen, click on the settings button on the upper left corner');
    });
});