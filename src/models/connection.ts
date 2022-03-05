import { Sequelize } from "sequelize";
import { database, environment } from "../config/config";

let sequelize = environment === 'production' ?
    // @ts-ignore
    new Sequelize(database.database_url, {
        dialect: database.dialect,
        logging: false,
        dialectOptions: {
           ssl: {
               require: true,
               rejectUnauthorized: false
           }
        }
    })
    :
    // @ts-ignore
    new Sequelize(database.name, database.user, database.pass, {
        host: database.host,
        dialect: database.dialect,
        logging: false
    });

export default sequelize;