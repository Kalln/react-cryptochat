import { Router, Request, Response, NextFunction } from "express";

export const shutdown = Router();

/**
 * THIS IS ONLY TO BE USED IN TEST! 
 * DE-ACTIVATE IN PRODUCTION
 * 
 * SHUTDOWNS THE SERVER.
 */
shutdown.post('/shutdown', (req, res) => {
    res.sendStatus(200);
    process.exit(0);
});