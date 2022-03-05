import {DatabaseHelper} from "../schema/database-helper";
import request from 'supertest';
import sinon from "sinon";

import './stub-redis' // Stub redis should be imported before the app
import { App } from "../src/app";

describe('outbound requests', function () {
    const OUTBOUND_URL = '/outbound/sms';
    let app;

    beforeAll(async function () {
        app = (new App()).run(4700);
        await DatabaseHelper.setup();
    })

    afterAll(async function () {
        await app.close()
        await DatabaseHelper.tearDown();
    })

    afterEach(() => {
        sinon.restore();
    });

    it('validates parameter presence', async function () {
        const body: any = {
            from: "peteru",
            to: "4924195509194",
            text: "STOP"
        };

        const toBody = {...body}
        delete toBody.to
        const toResponse = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(toBody);
        expect(toResponse.status).toEqual(400)
        expect(toResponse.text).toEqual(JSON.stringify({"message":"","error":"to is missing"}))

        const fromBody = {...body}
        delete fromBody.from
        const fromResponse = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(fromBody);
        expect(fromResponse.status).toEqual(400)
        expect(fromResponse.text).toEqual(JSON.stringify({"message":"","error":"from is missing"}))

        const textBody = {...body}
        delete textBody.text
        const textResponse = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(textBody);
        expect(textResponse.status).toEqual(400)
        expect(textResponse.text).toEqual(JSON.stringify({"message":"","error":"text is missing"}))
    })

    it('validates parameter validity', async function () {
        const body: any = {
            from: "919823243432",
            to: "4924195509194",
            text: "hello from India"
        };
        const numberCases = ['492', '49241955091944924195509194492419550919449241955091944924195509194'];
        const textCases = ['a'.repeat(121)]

        let testBody = {...body}
        for (const item of numberCases) {
            testBody.to = item
            const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(testBody);
            expect(response.status).toEqual(400);
            expect(response.text).toEqual(JSON.stringify({"message":"","error":"to is invalid"}));
        }

        testBody = {...body}
        for (const item of numberCases) {
            testBody.from = item
            const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(testBody);
            expect(response.status).toEqual(400);
            expect(response.text).toEqual(JSON.stringify({"message":"","error":"from is invalid"}));
        }

        testBody = {...body}
        for (const item of textCases) {
            testBody.text = item
            const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(testBody);
            expect(response.status).toEqual(400);
            expect(response.text).toEqual(JSON.stringify({"message":"","error":"text is invalid"}));
        }
    })

    it('validates existence of from', async function () {
        const body = {
            from: "61871112921",
            to: "61871112923",
            text: "STOP"
        };

        const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(body);
        expect(response.status).toEqual(404);
        expect(response.text).toEqual(JSON.stringify({"message":"","error":"from parameter not found"}));
    })

    it('stops request when pair exist', async function () {
        const body = {
            from: "4924195509194",
            to: "4924195509194",
            text: "STOP"
        };

        const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(body);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(JSON.stringify({"message":"","error":"sms from 4924195509194 to 4924195509194 blocked by STOP request"}));
    })

    it('stops request when limit is reached', async function () {
        const body = {
            from: "4924195509194",
            to: "12345677860505",
            text: "STOP"
        };

        const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(body);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(JSON.stringify({"message":"","error":"limit reached for from 4924195509194"}));
    })

    it('is valid', async function () {
        const body = {
            from: "3253280312",
            to: "12345677860505",
            text: "STOP"
        };

        const response = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1BOT0lN').send(body);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(JSON.stringify({"message":"outbound sms ok","error":""}));
    })
})