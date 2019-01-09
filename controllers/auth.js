const def = require('../models/def/statuses');
const _ = require('lodash'); //js utility lib
const bcrypt = require('bcrypt'); // for password encryption
const {
    User
} = require('../models/users');
const Joi = require('joi');
const express = require('express');
const controller = express.Router();

controller.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(250).required()
    }

    return Joi.validate(req, schema);
}

module.exports = controller;