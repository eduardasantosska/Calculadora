import { singleton } from "tsyringe";
import { Operation_e } from "../../../common/enum/enum";
import { Key } from "../../../common/models/Key";

const sequelize = require('./sequelize');
@singleton()
export class DBContextCalculator {
    constructor() { }

    async getHistoric() {
        try {
            const getOperation = (operation: Operation_e) => {
                switch (operation) {
                    case Operation_e.Plus:
                        return '+';
                    case Operation_e.Minus:
                        return '-';
                    case Operation_e.Divided:
                        return '/';
                    case Operation_e.Times:
                        return '*';
                }
            };
            const historic: any[] = await sequelize.models.Historic.findAll({ limit: 10, order: [['historicId', 'DESC']] });
            const historicAux: string[] = [];
            historic.forEach((his: any) => {
                historicAux.push(`${his.value1} ${getOperation(his.operation)} ${his.value2}`);
            });
            return historicAux;
        } catch (err) {
            return 'Error';
        }
    }

    async calculate(arrObj: Key[]) {
        try {
            let value1: string = '', value2: string = '', operation: number = -1;
            arrObj.forEach((obj: Key) => {
                if (obj.isEnum) {
                    operation = obj.value;
                } else if (!obj.isEnum && operation === -1) {
                    value1 += obj.value;
                } else {
                    value2 += obj.value;
                }
            });
            // await sequelize.models.Historic.create({ value1, value2, operation });
            const value = this.doCalculate(+value1, +value2, operation);
            return new Key(value, false);
        } catch (err) {
            return 'Error';
        }
    }

    doCalculate(value1: number, value2: number, operation: Operation_e) {
        switch (+operation) {
            case Operation_e.Plus:
                return value1 + value2;
            case Operation_e.Minus:
                return value1 - value2;
            case Operation_e.Divided:
                return value1 / value2;
            case Operation_e.Times:
                return value1 * value2;
            default:
                return 0;
        }
    }
}