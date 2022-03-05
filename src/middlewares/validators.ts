import {Request, Response, NextFunction} from "express";

export class Validators {
    static inbound(req: Request, res: Response, next: NextFunction) {
        const body =  req.body;
        if (!Validators.required(body.from)) return res.status(400).json({message: '', error: 'from is missing'});
        if (!Validators.required(body.to)) return res.status(400).json({message: '', error: 'to is missing'});
        if (!Validators.required(body.text)) return res.status(400).json({message: '', error: 'text is missing'});

        if (!Validators.withinBounds(6, 16, body.from)) return res.status(400).json({message: '', error: 'from is invalid'});
        if (!Validators.withinBounds(6, 16, body.to)) return res.status(400).json({message: '', error: 'to is invalid'});
        if (!Validators.withinBounds(1, 120, body.text)) return res.status(400).json({message: '', error: 'text is invalid'});

        // @ts-ignore
        if (!Validators.exists(body.to, req.account.PhoneNumbers)) return res.status(404).json({message: '', error: 'to parameter not found'});

        next()
    }

    static outbound(req: Request, res: Response, next: NextFunction) {
        const body =  req.body;
        if (!Validators.required(body.from)) return res.status(400).json({message: '', error: 'from is missing'});
        if (!Validators.required(body.to)) return res.status(400).json({message: '', error: 'to is missing'});
        if (!Validators.required(body.text)) return res.status(400).json({message: '', error: 'text is missing'});

        if (!Validators.withinBounds(6, 16, body.from)) return res.status(400).json({message: '', error: 'from is invalid'});
        if (!Validators.withinBounds(6, 16, body.to)) return res.status(400).json({message: '', error: 'to is invalid'});
        if (!Validators.withinBounds(1, 120, body.text)) return res.status(400).json({message: '', error: 'text is invalid'});

        // @ts-ignore
        if (!Validators.exists(body.from, req.account.PhoneNumbers)) return res.status(404).json({message: '', error: 'from parameter not found'});

        next()
    }

    private static required(field) {
        return !!field
    }

    private static withinBounds(min, max, field) {
        if (!field) return true
        return field.length >= min && field.length <= max
    }

    private static exists(to, list) {
        return list.some((item) => {
            return item.number === to
        });
    }
}