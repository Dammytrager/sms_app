import { App } from "./app";
import {port} from "./config/config";

const smsApp = new App();

smsApp.run(port || 4500);
