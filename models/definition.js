const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

let defSchema = new mongoose.Schema({
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

//const FruitType = mongoose.model('fruittypes', defSchema);

const defJoiSchema = {
    id: Joi.objectId(),
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(350)
}


function validateDef(definition) {
    return Joi.validate(definition, defJoiSchema);
}

module.exports.defSchema = defSchema;
module.exports.defJoiSchema = defJoiSchema;
module.exports.validateDef = validateDef;