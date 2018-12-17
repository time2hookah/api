const mongoose = require('mongoose');

module.exports = function (req, res, next) {

    if (req.params.id) {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidId) return res.status(404).send('Invalid Id.');
    } else if (req.body.id) {
        const isValidId = mongoose.Types.ObjectId.isValid(req.body.id);
        if (!isValidId) return res.status(404).send('Invalid Id.');
    } else {
        return res.status(404).send('Invalid Id.');
    }

    next();
}