const {
    defSchema,
    defJoiSchema
} = require('./definition');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const tobaccoFlavorSchema = defSchema.add({
    tobaccoBrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tobaccobrands'
    }
})

const TobaccoFlavor = mongoose.model('tobaccoflavors', tobaccoFlavorSchema);

function validateTobaccoFlavor(tobaccoFlavor) {
    let schema = defJoiSchema;
    schema.tobaccoBrandId = Joi.objectId().required();
    return Joi.validate(tobaccoFlavor, schema);
}

module.exports.TobaccoFlavor = TobaccoFlavor;
module.exports.validateTobaccoFlavor = validateTobaccoFlavor;