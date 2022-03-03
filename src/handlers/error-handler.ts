import {Request, Response, NextFunction, Errback} from "express";

export default class ErrorHandler {
    static notFound(req: Request, res: Response, next: NextFunction) {
        return res.status(405).json({error: 'Route does not exist'})
    }

    static internalError(err: Errback, req: Request, res: Response, next: NextFunction) {
        console.log(err)
        return res.status(500).json({message: '', error: 'unknown failure'})
    }
}