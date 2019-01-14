const def = require('../models/def/statuses');
const auth = require('../interceptors/auth');
const admin = require('../interceptors/admin');
const validateObjectId = require('../interceptors/validateObjectId');
const _ = require('lodash'); //js utility lib
const validateNow = require('../interceptors/validate');
const {
    TobaccoBrand,
    validate
} = require('../models/tobaccobrand')
const express = require('express');
const controller = express.Router();

controller.get('/', async (req, res) => {
    const tobaccobrand = await TobaccoBrand.find().sort('-ObjectId');
    res.send(tobaccobrand);
});

controller.get('/:id', validateObjectId, async (req, res) => {
    const tobaccobrand = await TobaccoBrand.findById(req.params.id);
    if (!tobaccobrand) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The tobacco brand with the given ID was not found.');
    res.send(tobaccobrand);
});

/*
 * in order to post new brand you have to have
 * valid token
 * admin role
 */
controller.post('/', [auth, admin, validateNow(validate)], async (req, res) => {

    let tobaccobrand = await TobaccoBrand.findOne({
        name: req.body.name
    });

    if (tobaccobrand) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Brand already exist.');

    tobaccobrand = new TobaccoBrand(_.pick(req.body, ['name', 'description','isFruit','price']));
    await tobaccobrand.save();

    res.send(_.pick(tobaccobrand, ['_id', 'name', 'description','isFruit','price']));
});

/*
 * in order to put(update) tobacco brand you have to have
 * valid id
 * valid token
 * admin role
 */
controller.put('/:id', [auth, admin, validateObjectId, validateNow(validate)], async (req, res) => {

    const tobaccoBrand = await TobaccoBrand.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, {
        new: true
    })

    if (!tobaccoBrand) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The tobacco brand with the given ID was not found.');

    res.send(tobaccoBrand);
});

/*
 * in order to delete tobacco brand you have to have
 * valid id
 * valid token
 * admin role
 */
controller.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const tobaccobrand = await TobaccoBrand.findByIdAndDelete(req.params.id);
    if (!tobaccobrand) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The tobacco brand with the given ID was not found.');
    res.send(tobaccobrand);
});

module.exports = controller;