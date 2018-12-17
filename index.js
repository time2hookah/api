const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')(); //logging library
require('./startup/controllers')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
//require('./startup/prod');

const port = process.env.PORT || 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;