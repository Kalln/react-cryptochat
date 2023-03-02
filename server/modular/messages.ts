import { Router, Request, Response, NextFunction } from "express";
import { stringify } from "querystring";

const valid_error = ['OK', 'no-msg', 'no-name', 'typeerror-msg', 'typeerror-name'] as const;
type valid_error_type = (typeof valid_error)[number];
export type message = {
    msg: Array<number>, 
    name: string,
    user_id: number,
    msg_id: number,
    createdAt: string
};
interface pre_message {
    msg: Array<number>,
    name: string
}
const msg_array = new Array<message>; // Database
export const router = Router();

//ID generator, generates a 12 digit number 
export function id_generator(user_id: number): number {
    return parseInt(user_id.toString() + "100000") + parseInt((Math.floor(100000 * Math.random()).toString()));
}

function create_timestamp(): string {
    const curr_date = new Date();
    const current_hour = curr_date.getHours() + 1 % 24;
    const current_min = curr_date.getMinutes();
    const current_sec = curr_date.getSeconds();
    return current_hour + ":" + current_min + ":" + current_sec;
}

// Routes

/**
 * Middleware, this is called before a GET or POST request.
 * Since we want to check if the request is in correct format,
 * this only handles POST requests for now. 
 */
router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'POST') {
        const content_error: valid_error_type = check_valid_msg_post(req);
        if (is_valid_error_message(content_error)) {
            if (content_error === 'OK') next();
            res.status(400).json({error: handle_error_message(content_error)});
            return
        } else {
            res.status(400).json({error: 'Something went wrong, try again.'});
            return;
        }
    }
    next();
})

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
    const {messagearray, username, user_id} = req.body;
    console.log(messagearray, username, user_id);
    try {
        const msg: message = {
            msg: messagearray,
            name: username,
            user_id: user_id,
            msg_id: id_generator(user_id),
            createdAt: create_timestamp()
        };
        msg_array.push(msg);
        res.status(200).json(msg);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
});

/**
 * If there is an error with the request this will specify the error.
 * 
 * @param req {Request} - A request from a client.
 * @returns a valid_error_type
 */
function check_valid_msg_post(req: Request): valid_error_type {

    function check_post_content(req: Request): number {

        return !req.body.messagearray
        ? 400 // message is missing
        : !req.body.username || req.body.username === ''
        ? 401 // username is missing
        : 200 // all OK
    }

    const result_content_check: number = check_post_content(req);

    if (result_content_check !== 200) {
        console.log('message not valid');
        return result_content_check === 400 
        ? 'no-msg'
        : 'no-name';
    }
    // Body ok, check types are correct.
    const {messagearray, username} = req.body;
    const pre: pre_message = {
        msg: messagearray,
        name: username
    };

    for (let i = 0; i < pre.msg.length; i++) {
        if (typeof(pre.msg[i]) !== 'number') {
           return 'typeerror-msg';
        }
    }
    return typeof(pre.name) === 'string' 
    ? 'OK'
    : 'typeerror-name';
}

/**
 * Credits to Patrick Roberts for this function and defining the types: 
 * https://stackoverflow.com/questions/57065617
 * 
 * Checks if a string is of type valid_error_type}
 * @param error_msg {string} - takes a error message
 * @returns a boolean, if true: error_msg is a valid_error_type
 */
function is_valid_error_message(error_msg: string): error_msg is valid_error_type  {
    return (valid_error as readonly string[]).includes(error_msg);
}

/**
 * Takes an error message and returns more detailed error message 
 * @param error_msg {valid_error_type} - takes a error_msg
 * @returns a string with the correct kind of error message to inform the user
 */
function handle_error_message(error_msg: valid_error_type): string {

    return error_msg === 'no-msg'
    ? 'No message was detected, try again'
    : error_msg === 'no-name'
    ? 'No name was chosen, click on the settings button on the upper left corner'
    : error_msg === 'typeerror-msg'
    ? 'Something went wrong, the message had wrong format, write a new message'
    : 'Something went worng, the username had wrong format, choose a new name';
}


