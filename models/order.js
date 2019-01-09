const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    orderTime: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    orderStatus: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 350
    },
    deliveryTime: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    orderDescription: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 350
    },
    orderTotal: {
        type: Number,
        required: true
    },
    totalPaid: {
        type: Number,
        required: false
    },
    /*payment:{
        type = new mongoose.Schema({
            paymentMethod:
        })
    }*/
});

const Order = mongoose.model('orders', orderSchema);

function validateOrder(order) {
    const schema = {
        customerId: Joi.objectId().required(),
        orderTime: Joi.string().min(6).max(6).required(),
        orderStatus: Joi.string().required(),
        fullAddress: Joi.string().min(15).max(350).required(),
        deliveryTime: Joi.string().min(6).max(6).required(),
        orderTotal: Joi.number().required(),
        totalPaid: Joi.number()
    };
    return Joi.validate(order, schema);
}

module.exports.Order = Order;
module.exports.validate = validateOrder;