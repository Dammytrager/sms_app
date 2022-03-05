import * as sinon from "sinon";
import * as redis from "redis";

const stubRedis = {
    connect: () => {
        return Promise.resolve(true)
    },
    set: (key, value) => {
        return Promise.resolve(true)
    },
    get: (key) => {
        if (key === '4924195509194-count') return Promise.resolve('50')
        return Promise.resolve('3')
    },
    mGet: (arr) => {
        const existentPair = ['4924195509194-4924195509194', '4924195509194-4924195509194']
        if (JSON.stringify(arr) === JSON.stringify(existentPair)) return Promise.resolve([true, true])
        return Promise.resolve([false, false])
    },
    expire: (key, ttl) => {
        return Promise.resolve(true)
    },
    ttl: (key, ttl) => {
        return Promise.resolve(true)
    }
};

sinon.stub(redis, 'createClient').returns(stubRedis);