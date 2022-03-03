import express, {Application} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import handler from './handlers'

const app: Application = express();
const PORT = 4500

// Configurations
dotenv.config()
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(handler) // Handles requests

app.listen(PORT, () => {
    console.log(`Node server listening on port ${PORT}`)
})