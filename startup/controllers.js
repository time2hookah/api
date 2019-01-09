const express = require('express');
const customers = require('../controllers/customers');
const orders = require('../controllers/orders');
const hookahheadtypes = require('../controllers/hookahheadtypes');
const tobaccoflavors = require('../controllers/tobaccoflavors');
const tobaccobrands = require('../controllers/tobaccobrands');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const error = require('../interceptors/error');

module.exports = function (app) {
    app.use(express.json());
    app.use(function (req, res, next) {


        res.setHeader('Access-Control-Allow-Origin', '*');


        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/tobaccobrands', tobaccobrands);
    app.use('/api/tobaccoflavors', tobaccoflavors);
    app.use('/api/hookahheadtypes', hookahheadtypes);
    app.use('/api/customers', customers);
    app.use('/api/orders', orders);
    //Error Handler
    app.use(error);
}