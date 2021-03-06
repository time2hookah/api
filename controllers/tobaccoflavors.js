const def = require('../models/def/statuses');
const auth = require('../interceptors/auth');
const admin = require('../interceptors/admin');
const validateObjectId = require('../interceptors/validateObjectId');
const _ = require('lodash'); //js utility lib
const validateNow = require('../interceptors/validate');
const {
    TobaccoFlavor,
    validateTobaccoFlavor
} = require('../models/tobaccoflavor');
const {
    TobaccoBrand
} = require('../models/tobaccobrand');
const express = require('express');
const controller = express.Router();

controller.get('/', async (req, res) => {
    const tobaccoflavor = await TobaccoFlavor.find().sort('-ObjectId');
    res.send(tobaccoflavor);
});

controller.get('/:id', validateObjectId, async (req, res) => {
    const tobaccoflavor = await TobaccoFlavor.findById(req.params.id);
    if (!tobaccoflavor) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The tobacco flavor with the given ID was not found.');
    res.send(tobaccoflavor);
});

/*
 * in order to post new flavor you have to have
 * valid token
 * admin role
 */
controller.post('/', [auth, admin, validateNow(validateTobaccoFlavor)], async (req, res) => {

    const tobaccobrand = await TobaccoBrand.findById(req.body.tobaccoBrandId);

    if (!tobaccobrand) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Tobacco brand does not exist.');

    /* let tobaccoflavor = await TobaccoFlavor.findOne({
         name: req.body.name
     });

     if (tobaccoflavor) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Flavor already exist.');*/

    tobaccoflavor = new TobaccoFlavor(_.pick(req.body, ['name', 'description', 'tobaccoBrandId']));
    await tobaccoflavor.save();

    res.send(_.pick(tobaccoflavor, ['_id', 'name', 'description', 'tobaccoBrandId']));
});

/*
 * in order to put(update) tobacco flavor you have to have
 * valid id
 * valid token
 * admin role
 */
controller.put('/:id', [auth, admin, validateObjectId, validateNow(validateTobaccoFlavor)], async (req, res) => {

    const tobaccobrand = await TobaccoBrand.findById(req.body.tobaccoBrandId);

    if (!tobaccobrand) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Tobacco brand does not exist for given tobaccoBrandId.');

    const tobaccoFlavor = await TobaccoFlavor.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        tobaccoBrandId: req.body.tobaccoBrandId
    }, {
        new: true
    })

    if (!tobaccoFlavor) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The tobacco flavor with the given ID was not found.');

    res.send(_.pick(tobaccoFlavor, ['_id', 'name', 'description', 'tobaccoBrandId']));
});

/*
 * in order to delete tobacco flavor you have to have
 * valid id
 * valid token
 * admin role
 */
controller.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const tobaccoflavor = await TobaccoFlavor.findByIdAndDelete(req.params.id);
    if (!tobaccoflavor) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('The tobacco flavor with the given ID was not found.');
    res.send(_.pick(tobaccoflavor, ['_id', 'name', 'description', , 'tobaccoBrandId']));
});

module.exports = controller;