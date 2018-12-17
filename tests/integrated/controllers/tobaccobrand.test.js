const {
    TobaccoBrand,
    validate
} = require('../../../models/tobaccobrand');

const {
    User
} = require('../../../models/users');
const def = require('../../../models/BE/apiStatus');
const request = require('supertest');
const http = require('http');
//const mongoose  = require('mongoose');

let server;
let token;

describe('/api/tobaccobrands', () => {

    beforeEach(() => {

        server = require('../../../index');
        //token = new User().generateAuthToken();
    });

    afterEach(async () => {
        await server.close;
        // await TobaccoBrand.remove({});
    });

    describe('GET /', () => {

        it('Should return list of tobacco brands status code 200OK', async () => {
            token = '';
            await TobaccoBrand.collection.insertMany([{
                    name: 'Al Fakher',
                    desc: 'Al Fakher hookah tobacco'
                },
                {
                    name: 'Star buzz',
                    desc: 'Star Buzz hookah tobacco'
                }
            ]);

            const res = await request(server)
                .get('/api/tobaccobrands');
            //.set('x-auth-token', token);


            expect(res.status).toBe(def.API_STATUS.SUCCESS.OK);
            //expect(res.body.length).toBe(2);
            //expect(res.body.some(g => g.name === 'Al Fakher')).toBeTruthy();
            // expect(res.body.some(g => g.name === 'Star buzz')).toBeTruthy();

        });
    });
});