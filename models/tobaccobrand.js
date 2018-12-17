const mongoose = require('mongoose');
const Joi = require('joi');

const tobaccobrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 350
    }
});

const TobaccoBrand = mongoose.model('tobaccobrands', tobaccobrandSchema);

function validateTobaccoBrand(tobaccobrand) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(350)
    };

    return Joi.validate(tobaccobrand, schema);
}

module.exports.TobaccoBrand = TobaccoBrand;
module.exports.validate = validateTobaccoBrand;