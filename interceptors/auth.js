const def = require('../models/def/statuses');
const jwt = require('jsonwebtoken');
//const config = require('config');
const winston = require('winston');
const fs = require('fs'); //file system

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const publicKEY = fs.readFileSync('./config/keys/public.key', 'utf8');
        const i = 'time2hookah llc'; // Issuer 
        const s = 'info@time2hookah.com'; // Subject 
        const a = 'http://time2hookah.com'; // Audience
        // SIGNING OPTIONS
        const verifyOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "1h",
            algorithm: "RS256"
        };
        const decoded = jwt.verify(token, publicKEY, verifyOptions);
        req.user = decoded;
        next();
    } catch (e) {
        winston.error(e.message, e);
        res.status(def.API_STATUS.CLIENT_ERROR.BAD_REQUEST).send('Invalid token');
    }
}