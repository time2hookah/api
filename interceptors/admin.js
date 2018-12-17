const base      = require('../models/BE/apiStatus');
const request   = require('supertest');

module.exports = function (req, res, next){
   
    if(!req.user.isAdmin) return res.status(base.API_STATUS.CLIENT_ERROR.FORBIDDEN).send('Access denided');

    next();
}