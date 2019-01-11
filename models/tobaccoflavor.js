const {
    defSchema,
    validateDef
} = require('./definition');
const mongoose = require('mongoose');

const TobaccoFlavor = mongoose.model('tobaccoflavors', defSchema);

module.exports.TobaccoFlavor = TobaccoFlavor;
module.exports.validate = validateDef;