import { Router, Request, Response } from "express";

export type message = {
    msg: string, 
    name: string,
    id: number
};
const msg_array = new Array<message>; // Database
export const router = Router();

//ID generator


// Routes
/**
 * When GET method is called on 'http://localhost:4000/api/messages'
 * all previous sent messages by the POST request will be sent to the client. 
 * This response is a simple array that we are using as our databse.
 */
router.get('/', (req: Request, res: Response) => {
    const all_messages = msg_array;
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
router.post('/', (req: Request, res: Response) => {
    const {messagestring, username} = req.body;
    try {
        const msg: message = {msg: messagestring, name: username, id: 1};
        msg_array.push(msg);
        res.status(200).json(msg);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
})