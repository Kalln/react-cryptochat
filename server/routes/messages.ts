import { Request, Express, Response } from 'express';
import { create_message, get_messages } from '../controllers/messageController';
const express = require('express');


export const router = express.Router();

// gets all messages
router.get('/', get_messages);

// post message
router.post('/', create_message);


router.get('/:id', (req: Request, res: Response) => {
    res.json({msg: 'GET single message'});
});
