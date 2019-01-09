const def = require('../models/def/statuses');
const auth = require('../interceptors/auth');
const admin = require('../interceptors/admin');
const validateObjectId = require('../interceptors/validateObjectId');
const validateNow = require('../interceptors/validate');
const _ = require('lodash'); //js utility lib
const bcrypt = require('bcrypt'); // for password encryption
const {
    User,
    validate
} = require('../models/users');
const express = require('express');
const controller = express.Router();

controller.get('/', [auth, admin], async (req, res) => {
    const users = await User.find().sort('-ObjectId');
    res.send(users);
});

controller.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.body._id).select('-password');
    if (!user) return res.status(def.API_STATUS.CLIENT_ERROR.NOT_FOUND).send('No user found for given Id.');

    res.send(user);
});

controller.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(base.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('User already registered.');

    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
});

controller.put('/:id', [auth, validateObjectId, validateNow(validate)], async (req, res) => {
    const user = await User.findOneAndUpdate(req.param.id, req.body, {
        new: true
    });
    res.send(user);
});

controller.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
});

module.exports = controller;