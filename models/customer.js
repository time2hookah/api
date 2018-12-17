const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 14
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    address1: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150
    },
    address2: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 150
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    zipcode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    }

});

const Customer = mongoose.model('customers', customerSchema);

function validateCustomer(customer) {
    const schema = {
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        phone: Joi.string().min(10).max(15).required(),
        email: Joi.string().email().min(6).max(150).required(),
        address1: Joi.string().min(5).max(150).required(),
        address2: Joi.string().min(1).max(150),
        city: Joi.string().min(2).max(50).required(),
        state: Joi.string().min(2).max(2).required(),
        zipcode: Joi.string().min(5).max(10).required()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;