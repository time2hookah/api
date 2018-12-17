const winston = require('winston');

require('express-async-errors');//wrap a route or pre handler run (run time)

module.exports = function () {

    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'exceptions.log' }));

    process.on('unhandledRejection', (ex)=>{
        throw(ex);
    });

    winston.add( winston.transports.File,{ filename: 'logfile.log' });
     
}