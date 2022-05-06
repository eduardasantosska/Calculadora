import { DataTypes } from 'sequelize';
import { Operation_e } from '../../../../../common/enum/enum';

module.exports = (sequelize: any) => {
    sequelize.define('Historic', {
        historicId: {
            type: DataTypes.INTEGER
            , allowNull: false
            , primaryKey: true
            , autoIncrement: true
        }
        , value1: {
            type: DataTypes.INTEGER
            , allowNull: false
        }
        , value2: {
            type: DataTypes.INTEGER
            , allowNull: false
        }
        , operation: {
            type: DataTypes.INTEGER
            , defaultValue: Operation_e.Plus
        }
    }
    , {
        tableName: 'Historic'
        , timestamps: false
    });
}