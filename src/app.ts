import express, {Application} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import handler from './handlers'

export class App {
    app: Application

    constructor() {
        this.app = express()
        this.config();
    }

    run(port) {
        return this.app.listen(port, () => {
            console.log(`Node Server listening on Port ${port}`);
        });
    }

    private config() {
        dotenv.config()
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(handler) // Handles requests
    }
}