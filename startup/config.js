const config     = require('config');

module.exports = function () {
    
    if( !config.get('t2h_jwtPrivateKey') ){
        throw new Error('FATAL ERROR: t2h_jwtPrivateKey is not defined.');
    }
    
}