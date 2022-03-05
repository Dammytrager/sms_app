// This file is used to load the db and make the dbuser as specified in the env
// the owner of the tables

// @ts-ignore
import { DatabaseHelper } from "./database-helper";

DatabaseHelper.setup();
