import * as redis from "redis";
import {environment, redis as redisConfig} from "../config/config";

// @ts-ignore
const client =  environment === 'production' ?
    redis.createClient({
        url: redisConfig.url,
        socket: {
            tls: true,
            rejectUnauthorized: false
        }
    })
    :
    redis.createClient({
        url: redisConfig.url
    });

(async () => {
    await client.connect();
})()

export default client;