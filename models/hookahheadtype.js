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
<<<<<<< HEAD
    },
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 350
    },
    price:{
        type:Number,
        required:true,
        min:0,
        max:100
=======
>>>>>>> 8b9c31fe7082c466d3716a668bff30ca2f3fcdbd
    }
})

const HookahHeadType = mongoose.model('hookahheadtypes', hookahheadtypeSchema);

function validateToHookahHeadType(hookahheadtype) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isFruit: Joi.boolean().required(),
        description: Joi.string().min(5).max(350),
        price:Joi.number().min(0).max(100).required()
    };

    return Joi.validate(hookahheadtype, schema);
}

module.exports.HookahHeadType = HookahHeadType;
module.exports.validate = validateToHookahHeadType;