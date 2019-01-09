const def = require('../models/def/statuses');
const auth = require('../interceptors/auth');
const admin = require('../interceptors/admin');
const validateObjectId = require('../interceptors/validateObjectId');
const _ = require('lodash'); //js utility lib
const validateNow = require('../interceptors/validate');
const {
    Order,
    validate
} = require('../models/order');
const {
    Customer
} = require('../models/customer');
const express = require('express');
const controller = express.Router();



controller.get('/', [auth, admin], async (req, res) => {
    const orders = await Order.find().sort('-orderDate');
    res.send(orders);
});

controller.get('/:id', [auth, admin, validateObjectId], async (re, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('unable to find the order for given id.');

    res.send(order);
});

controller.get('/my', [auth, validateObjectId], async (req, res) => {
    const order = await Order.findById(req.body.id);
    if (!order) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('No orders found for given Id.');

    res.send(order);
});

/*
 * { customerID,firstName,lasNname,email,phone {customer}
 * address1,address2,city,state,zipcode {address}
 * delivaryTime}
 */
controller.post('/', [validateNow(validate)], async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
        customer = new Customer({
            firstName: req.body.customer
        })
    }

    const order = new Orders(_.pick(req.body, ['firstName', 'lastName', 'email', 'phone',
        'address1', 'address2', 'city', 'state', 'zipcode'
    ]));
    await order.save();

    res.send(_.pick(orders, ['_id', 'firstName', 'lastName', 'email', 'phone',
        'address1', 'address2', 'city', 'state', 'zipcode'
    ]));
});

controller.put('/:id', [auth, validateObjectId, validateNow(validate)], async (req, res) => {
    const orders = await Orders.findOneAndUpdate(req.param.id, req.body, {
        new: true
    });
    res.send(orders);
});

controller.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const orders = await Orders.findByIdAndDelete(req.params.id);
    res.send(orders);
});

module.exports = controller;