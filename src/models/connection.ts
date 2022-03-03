import { Sequelize } from "sequelize";
import { database} from "../config/config";

// @ts-ignore
let sequelize = new Sequelize(database.name, database.user, database.pass, {
    host: database.host,
    dialect: database.dialect,
    logging: false
});

export default sequelize;