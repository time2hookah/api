const {
    defSchema,
    validateDef
} = require('./definition');
const mongoose = require('mongoose');

const TobaccoBrand = mongoose.model('tobaccobrands', defSchema);

module.exports.TobaccoBrand = TobaccoBrand;
module.exports.validate = validateDef;