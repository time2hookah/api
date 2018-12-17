const mongoose = require('mongoose');
const Joi = require('joi');

const tobaccoflavorSchema = new mongoose.Schema({
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

const TobaccoFlavor = mongoose.model('tobaccoflavors', tobaccoflavorSchema);

function validateTobaccoFlavor(tobaccoflavor) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(350)
    };

    return Joi.validate(tobaccoflavor, schema);
}

module.exports.TobaccoFlavor = TobaccoFlavor;
module.exports.validate = validateTobaccoFlavor;