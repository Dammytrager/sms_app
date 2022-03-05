import {Request, Response, NextFunction} from "express";
import redis from "../lib/redis";

export default class MessageHandler {
    static async inbound(req: Request, res: Response, next: NextFunction) {
        try {
            const text = req.body.text.replace(/\r?\n|\r/g, "");
            const from = req.body.from;
            const to  = req.body.to;

            if (text === 'STOP') {
                const key = `${from}-${to}`
                await redis.set(key, 'true')
                await redis.expire(key, 4 * 60 * 60) // TTL 4 hours
            }

            res.json({message: 'inbound sms ok', error: ''});
        } catch (e) {
            next(e)
        }
    }

    static async outbound(req: Request, res: Response, next: NextFunction) {
        try {
            const from = req.body.from;
            const to  = req.body.to;

            const pairExists = await MessageHandler.pairExists(from, to)
            if (pairExists) return res.json({message: '', error: `sms from ${from} to ${to} blocked by STOP request`});


            const fromKey = `${from}-count`;
            const fromRequestCount = await redis.get(fromKey);

            if (!fromRequestCount) { // First call from this user
                await redis.set(fromKey, '1');
                await redis.expire(fromKey, 24 * 60 * 60);
            } else {
                let count = parseInt(fromRequestCount);

                // user has max their calls
                if (count >= 50) return res.json({message: '', error: `limit reached for from ${from}`});

                else {
                    count = count + 1;
                    const ttl = await redis.ttl(fromKey);
                    await redis.set(fromKey, count) // Update the calls count
                    await redis.expire(fromKey, ttl)
                }
            }

            return res.json({message: 'outbound sms ok', error: ''});
        } catch (e) {
            next(e)
        }
    }

    private static async pairExists(from, to) {
        let keys = [`${from}-${to}`, `${to}-${from}`];
        let previouslyStopped = await redis.mGet(keys);

        return previouslyStopped.some((item) => !!item)
    }
}