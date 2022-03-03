import {Request, Response, NextFunction} from "express";
import Account from "../models/Account";
import PhoneNumber from "../models/PhoneNumber";

export async function authenticate (req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(403).send();

        const encodedAuth = authHeader.split(' ')[1];
        if (!encodedAuth) return res.status(403).send();

        const decodedAuth = decodeBase64(encodedAuth);
        const [username, password] = decodedAuth.split(':');

        Account.hasMany(PhoneNumber, {foreignKey: 'account_id'})
        const account = await Account.findOne({
            where: {
                username: username,
                auth_id: password
            },
            include: {
                model: PhoneNumber,
                attributes: ['id', 'number']
            }
        });
        if (!account) return res.status(403).send();
        // @ts-ignore
        req.account = account.toJSON();
        next();
    } catch (e) {
        next(e);
    }
}

function decodeBase64(base64) {
    const buffer = new Buffer(base64, 'base64');
    return buffer.toString('ascii');
}