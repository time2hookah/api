const winston = require('winston'); //logging library

module.exports = function (err, req, res, next) {
    // console.log(err);
    winston.error(err.message, err);
    //error,warn,info,verbos/debug,silly
    res.status(500).send('Unexpected error.');
}