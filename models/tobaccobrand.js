const {
    defSchema,
    validateDef
} = require('./definition');
const mongoose = require('mongoose');
const Joi = require('joi');

const tobaccobrandSchema = defSchema.add({
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        trim: true
    }
});

const TobaccoBrand = mongoose.model('tobaccobrands', tobaccobrandSchema);

function validateToTobaccobrand(tobaccobrand) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(350),
        price:Joi.number().min(0).max(100).required()
    };

    return Joi.validate(tobaccobrand, schema);
}
module.exports.TobaccoBrand = TobaccoBrand;
module.exports.validate = validateToTobaccobrand;