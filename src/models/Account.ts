import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class Account extends Model {}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        auth_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'account',
        timestamps: false
    }
);

export default Account;