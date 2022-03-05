import * as redis from "redis";
import { redis as redisConfig } from "../config/config";

// @ts-ignore
const client = redis.createClient({
    url: redisConfig.url
});

export default client;