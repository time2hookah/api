const {
    defSchema,
    validateDef
} = require('./definition');
const mongoose = require('mongoose');
const Joi = require('joi');

const hookahheadtypeSchema = defSchema.add({
    isFruit: {
        type: Boolean,
        required: true,
        default: true
    }
})

const HookahHeadType = mongoose.model('hookahheadtypes', hookahheadtypeSchema);

function validateToHookahHeadType(hookahheadtype) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isFruit: Joi.boolean().required(),
        description: Joi.string().min(5).max(350)
    };

    return Joi.validate(hookahheadtype, schema);
}

module.exports.HookahHeadType = HookahHeadType;
module.exports.validate = validateToHookahHeadType;