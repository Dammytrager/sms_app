import fs from "fs";
import path from "path";
import {database} from "../src/config/config";
import sequelize from "../src/models/connection";

export class DatabaseHelper {
    static async setup() {
        try {
            let query = fs.readFileSync(path.resolve('schema', 'schema.sql'), 'utf8');
            // @ts-ignore
            query = query.replace(/\bpostgres\b/g, database.user)

            await sequelize.query(query)

            return Promise.resolve(true)
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }

    static async tearDown() {
        try {
            await sequelize.query('DROP TABLE phone_number')
            await sequelize.query('DROP TABLE account')

            return Promise.resolve(true)
        } catch (e) {
            console.log(e)
            return Promise.reject(e)
        }
    }
}