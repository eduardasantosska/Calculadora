import { container } from 'tsyringe';
import { NextFunction, Request, Response } from "express";
import { DBContextCalculator } from '../Database/DBContextCalculator';

export class CalculatorController {
    constructor () { };

    getHistoric(req: Request, res: Response, next: NextFunction) {
        const dbContext = container.resolve(DBContextCalculator);
        dbContext.getHistoric().then((resCtx: any) => {
            res.status(201).send(resCtx);
        }).catch((err: any) => {
            res.status(500).send(err);
        })
    }

    calculate(req: Request, res: Response, next: NextFunction) {
        const dbContext = container.resolve(DBContextCalculator);
        dbContext.calculate(req.body).then((resCtx: any) => {
            res.status(201).send(resCtx);
        }).catch((err: any) => {
            res.status(500).send(err);
        })
    }
}