import * as redis from "redis";
import { redis as redisConfig } from "../config/config";

// @ts-ignore
const client = redis.createClient({
    url: redisConfig.url
});

(async() => {
    await client.connect();
})()

export default client;