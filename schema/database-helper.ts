import fs from "fs";
import path from "path";
import {database} from "../src/config/config";
import {Sequelize} from "sequelize";

export class DatabaseHelper {
    static async setup() {
        try {
            let query = fs.readFileSync(path.resolve('schema', 'schema.sql'), 'utf8');
            // @ts-ignore
            query = query.replace(/\bpostgres\b/g, database.user)

            // @ts-ignore
            let sequelize = new Sequelize(database.name, database.user, database.pass, {
                host: database.host,
                dialect: database.dialect,
                logging: false
            })

            await sequelize.authenticate()
            await sequelize.query(query)

            return Promise.resolve(true)
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }

    static async tearDown() {
        try {
            // @ts-ignore
            let sequelize = new Sequelize(database.name, database.user, database.pass, {
                host: database.host,
                dialect: database.dialect
            })

            await sequelize.authenticate()
            await sequelize.query('DROP TABLE phone_number')
            await sequelize.query('DROP TABLE account')

            return Promise.resolve(true)
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }
}