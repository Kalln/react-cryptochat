import { Request, Response } from 'express';

type message = {
    msg: string,
    name: string,
    id: string
}

const msg_array = new Array<message>;

function genUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36); // convert num to base 36 and stringify
  
    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8); // start at index 2 to skip decimal point
  
    return dateStr + '-' + randomStr;
  }

// get all messages
export const get_messages = (req: Request, res: Response) => {
    const all_messages = msg_array;

    res.status(200).json(all_messages);
}

// create message

export const create_message = (req: Request, res: Response) => {
    const {messagestring, username} = req.body;
    try {
        const msg: message = {msg: messagestring, name: username, id: genUniqueId()};
        msg_array.push(msg);
        res.status(200).json(msg);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}
