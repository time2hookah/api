const def = require('../models/def/statuses');
const auth = require('../interceptors/auth');
const admin = require('../interceptors/admin');
const validateObjectId = require('../interceptors/validateObjectId');
const _ = require('lodash'); //js utility lib
const validateNow = require('../interceptors/validate');
const {
    Customer,
    validate
} = require('../models/customer');
const express = require('express');
const controller = express.Router();

controller.get('/', [auth, admin], async (req, res) => {
    const customers = await Customer.find().sort('-ObjectId');
    res.send(customers);
});

controller.get('/me', [auth, validateObjectId], async (req, res) => {
    const customer = await Customer.findById(req.body.id);
    if (!customer) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('No customer found for given Id.');

    res.send(_.pick(customer, ['_id', 'firstName', 'lastName', 'email', 'phone',
        'address1', 'address2', 'city', 'state', 'zipcode'
    ]));
});

controller.post('/', [validateNow(validate)], async (req, res) => {
    let customer = await Customer.findOne({
        email: req.body.email
    });
    if (customer) return res.status(base.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Customer already registered.');

    customer = new Customer(_.pick(req.body, ['firstName', 'lastName', 'email', 'phone',
        'address1', 'address2', 'city', 'state', 'zipcode'
    ]));
    await customer.save();

    res.send(_.pick(customer, ['_id', 'firstName', 'lastName', 'email', 'phone',
        'address1', 'address2', 'city', 'state', 'zipcode'
    ]));
});

controller.put('/:id', [auth, validateObjectId, validateNow(validate)], async (req, res) => {
    const customer = await Customer.findOneAndUpdate(req.param.id, req.body, {
        new: true
    });
    res.send(customer);
});

controller.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.send(customer);
});

module.exports = controller;