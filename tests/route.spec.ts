import {DatabaseHelper} from "../schema/database-helper";
import request from 'supertest';

import sinon from "sinon";

import './stub-redis' // Stub redis should be imported before the app
import { App } from "../src/app";

describe('inbound requests', function () {
    const INBOUND_URL = '/inbound/sms';
    const OUTBOUND_URL = '/outbound/sms';
    let app;

    beforeAll(async function () {
        app = (new App()).run(9000);
        await DatabaseHelper.setup();
    });

    afterAll(async function () {
        await app.close();
        await DatabaseHelper.tearDown();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('captures wrong route', async function () {
        const wrongRoute = '/wrongroute'
        const response = await request(app).post(wrongRoute).send({});
        expect(response.status).toEqual(405)
    })

    it('authenticates', async function () {
        let inResponse = await request(app).post(INBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1B0lN').send({});
        expect(inResponse.status).toEqual(403)

        let outResponse = await request(app).post(OUTBOUND_URL).set('Authorization', 'Basic YXpyMToyMFMwS1B0lN').send({});
        expect(outResponse.status).toEqual(403)
    })
})