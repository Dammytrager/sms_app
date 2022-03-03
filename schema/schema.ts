// This file is used to load the db and make the dbuser as specified in the env
// the owner of the tables

import path from "path";
import fs from 'fs';
import { Sequelize } from 'sequelize';
import { database } from "../src/config/config";

let query = fs.readFileSync(path.resolve('schema', 'schema.sql'), 'utf8');
// @ts-ignore
query = query.replace(/\bpostgres\b/g, database.user)

// @ts-ignore
let sequelize = new Sequelize(database.name, database.user, database.pass, {
    host: database.host,
    dialect: database.dialect
})

sequelize.authenticate().then(async r => {
    console.log('Setting up DB...')
    await sequelize.query(query)
    console.log('DB setup successfully.')
}).catch(err => {
    console.log(err)
});
