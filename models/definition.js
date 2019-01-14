const mongoose = require('mongoose');
const Joi = require('joi');

const defSchema = new mongoose.Schema({
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

function validateDef(definition) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(350)
    };

    return Joi.validate(definition, schema);
}

module.exports.defSchema = defSchema;
module.exports.validateDef = validateDef;