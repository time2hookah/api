const {
    defSchema,
    defJoiSchema
} = require('./definition');
const mongoose = require('mongoose');
const Joi = require('joi');

const hookahheadtypeSchema = defSchema.add({
    isFruit: {
        type: Boolean,
        required: false
    },
    price: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    }
})

const HookahHeadType = mongoose.model('hookahheadtypes', hookahheadtypeSchema);

function validateToHookahHeadType(hookahheadtype) {

    let schema = defJoiSchema;
    schema.isFruit = Joi.boolean().required();
    schema.price = Joi.number().min(0).max(100).required();
    return Joi.validate(hookahheadtype, schema);
}

module.exports.HookahHeadType = HookahHeadType;
module.exports.validateToHookahHeadType = validateToHookahHeadType;