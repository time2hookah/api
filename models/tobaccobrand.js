const {
    defSchema,
    defJoiSchema
} = require('./definition');
const mongoose = require('mongoose');
const Joi = require('joi');

const tobaccobrandSchema = defSchema.add({
    price: {
        type: Number,
        required: false,
        min: 0,
        max: 100,
        trim: true
    }
});

const TobaccoBrand = mongoose.model('tobaccobrands', tobaccobrandSchema);

function validateTobaccobrand(tobaccobrand) {
    let schema = defJoiSchema;
    schema.price = Joi.number().min(0).max(100).required();
    return Joi.validate(tobaccobrand, schema);
}
module.exports.TobaccoBrand = TobaccoBrand;
module.exports.validateTobaccobrand = validateTobaccobrand;