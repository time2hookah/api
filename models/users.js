const config = require('config');
const fs = require('fs'); //file system
const jwt = require('jsonwebtoken'); //generate json token
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const PasswordComplexity = require('joi-password-complexity');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 250
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {

    // PRIVATE and PUBLIC key

    let privateKEY = fs.readFileSync('./models/private.key');

    const i = 'time2hookah llc'; // Issuer 
    const s = 'info@time2hookah.com'; // Subject 
    const a = 'http://time2hookah.com'; // Audience
    // SIGNING OPTIONS
    const signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "1h",
        algorithm: "RS256"
    };
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        isAdmin: this.isAdmin
    }, privateKEY, signOptions);
    return token;
}

userSchema.methods.validatePassword = function () {
    const complexityOptions = {
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    }
    return Joi.validate(this.password, new PasswordComplexity(complexityOptions));
}

const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const schema = {
        id: Joi.objectId(),
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    }

    return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;