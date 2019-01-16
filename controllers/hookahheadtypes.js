const def = require('../models/def/statuses');
const auth = require('../interceptors/auth');
const admin = require('../interceptors/admin');
const validateObjectId = require('../interceptors/validateObjectId');
const _ = require('lodash'); //js utility lib
const validateNow = require('../interceptors/validate');
const {
    HookahHeadType,
    validateToHookahHeadType
} = require('../models/hookahheadtype')
const express = require('express');
const controller = express.Router();

controller.get('/', async (req, res) => {
    const hookahheadtype = await HookahHeadType.find().sort('-ObjectId');
    res.send(hookahheadtype);
});

controller.get('/:id', validateObjectId, async (req, res) => {
    const hookahheadtype = await HookahHeadType.findById(req.params.id);
    if (!hookahheadtype) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The hookah head type with the given ID was not found.');
    res.send(hookahheadtype);
});

/*
 * in order to post new hookah head type you have to have
 * valid token
 * admin role
 */
controller.post('/', [auth, admin, validateNow(validateToHookahHeadType)], async (req, res) => {

    let hookahheadtype = await HookahHeadType.findOne({
        name: req.body.name
    });

    if (hookahheadtype) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Hookah head type already exist.');

    hookahheadtype = new HookahHeadType(_.pick(req.body, ['name', 'isFruit', 'description', 'price']));
    await hookahheadtype.save();

    res.send(_.pick(hookahheadtype, ['_id', 'name', 'isFruit', 'description', 'price']));
});

/*
 * in order to put(update) tobacco head type you have to have
 * valid id
 * valid token
 * admin role
 */
controller.put('/:id', [auth, admin, validateObjectId, validateNow(validateToHookahHeadType)], async (req, res) => {

    const hookahheadtype = await HookahHeadType.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isFruit: req.body.isFruit,
        description: req.body.description,
        price: req.body.price
    }, {
        new: true
    })

    if (!hookahheadtype) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The hookah head type with the given ID was not found.');

    res.send(hookahheadtype);
});

/*
 * in order to delete tobacco flavor you have to have
 * valid id
 * valid token
 * admin role
 */
controller.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const hookahheadtype = await HookahHeadType.findByIdAndDelete(req.params.id);
    if (!hookahheadtype) return res.status(404).send('The hookah head type with the given ID was not found.');
    res.send(hookahheadtype);
});

module.exports = controller;