import { Model, Sequelize, DataTypes } from "sequelize";
import sequelize from "./connection";
import Account from "./Account"

class PhoneNumber extends Model {}

PhoneNumber.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'account_id',
            references: {
                model: Account,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'PhoneNumber',
        tableName: 'phone_number',
        timestamps: false
    }
)

PhoneNumber.belongsTo(Account);

export default PhoneNumber;