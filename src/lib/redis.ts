import { createClient } from "redis";
import { redis } from "../config/config";

// @ts-ignore
const client = createClient(redis.url);

(async() => {
    await client.connect();
})()

export default client;