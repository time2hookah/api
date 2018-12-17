const base = require('../../../models/BE/apiStatus');
const request = require('supertest');
const {
    User
} = require('../../../models/users');
const mongoose = require('mongoose');

let server;
let token;

describe('/api/users', () => {

    beforeEach(() => {
        server = require('../../../index');
        token = new User().generateAuthToken();
    });
    afterEach(async () => {
        await server.close;
        await User.remove({});
    });

    /* describe('GET /', () =>{
       
        it('should return all Users if there is valid token and admin', async () => {

            await User.collection.insertMany([
                {   
                    firstName   :'Shirak',
                    lastName    :'Avakian',
                    email       :'shirakavakian1@gmail.com',
                    password    :'Joy2theworld'
                },
                {   
                    firstName   :'Jivan',
                    lastName    :'Avakian',
                    email       :'jivanavakian@gmail.com',
                    password    :'Joy2theworld123' 
                }
            ]);

            const res = await request(server)
                .get('/api/users')
                .set('x-auth-token',token);
               

            expect(res.status).toBe(base.API_STATUS.SUCCESS.OK);
            //expect(res.body.length).toBe(2);
            expect(res.body.some( g => g.firstName === 'Shirak')).toBeTruthy();
            expect(res.body.some( g => g.firstName === 'Jivan')).toBeTruthy();
        });
       
        it('should return status 401 if the token is not valid or not provided', async () => {
            token='';
            await User.collection.insertMany([
                {   
                    firstName:'Shirak',
                    lastName:'Avakian',
                    email:'shirakavakian5@gmail.com',
                    password:'Joy2theworld'
                },
                {   
                    firstName:'Jivan',
                    firstName:'Avakian',
                    email:'jivanavakian5@gmail.com',
                    password:'Joy2theworld123' 
                }
            ]);
            const res = await request(server)
                .get('/api/users')
                .set('x-auth-token',token);

            expect(res.status).toBe(base.API_STATUS.CLIENT_ERROR.UNAUTHORIZED);
            
        });
    });
 */
    describe('GET /:id', () => {

        it('should return a user if valid id is passed', async () => {

            const user = new User({
                firstName: 'Shirak',
                lastName: 'Avakian',
                email: 'shirakavakian6@gmail.com',
                password: 'Joy2theworld'
            });
            await user.save();

            const res = await request(server)
                .get('/api/users/me')
                .set('x-auth-token', token)
                .send(user);

            expect(res.status).toBe(base.API_STATUS.SUCCESS.OK);
            expect(res.body).toHaveProperty('firstName', user.firstName);
        });

        it('should return a 404 if invalid id is passed', async () => {

            const res = await request(server).get('/api/users/1');

            expect(res.status).toBe(base.API_STATUS.CLIENT_ERROR.NOT_FOUND);

        });

        it('should return a 404 if no user with given id exist', async () => {
            const id = mongoose.Types.ObjectId()
            const res = await request(server).get('/api/users/' + id);

            expect(res.status).toBe(base.API_STATUS.CLIENT_ERROR.NOT_FOUND);

        });
    });

    describe('POST /', () => {

        it('should save new user if the all requirements passed', async () => {

            const user = {
                firstName: 'Shirak',
                lastName: 'Avakian',
                email: 'shirakavakian2@gmail.com',
                password: 'Joy2theworld'
            }
            const res = await request(server)
                .post('/api/users')
                .set('x-auth-token', token)
                .send(user);

            expect(res.status).toBe(base.API_STATUS.SUCCESS.OK);
            expect(res.body.email).toBe('shirakavakian2@gmail.com');
        });
    });

});