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