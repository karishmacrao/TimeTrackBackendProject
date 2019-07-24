let jwt = require('jsonwebtoken');
const config = require('../config/config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log("Token is" + token)
    if (token) {
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        console.log(token)
        jwt.verify(token, config.tokenKey, (err, decoded) => {
            console.log("Token under verification " + token);
            if (err) {
                console.log("Token error"+err);
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