let jwt = require('jsonwebtoken');
const config = require('../config/config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorizaation'];
    if (token) {
        if (token.stratsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.tokenKey, (err, decode) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Invalid token"
                });

            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.json({
            success: false,
            message: "Auth Token Not Found."

        });
    }
}
module.exports = {checkToken};