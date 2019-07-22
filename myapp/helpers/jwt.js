const expressJwt = require('express-jwt');
const userService = require('../services/user.service');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.jwt = function () {
    console.log("Base")
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/api/user/login',
            '/api/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log("isRevoked")
    const user = await userService.getById(payload.sub);
    if (!user) {
        return done(null, true);
    }
    done();
};

exports.createToken = function (user, header, cb) {
    console.log("createToken")
    let token = jwt.sign({
        user,
        userAgent: header
    },
        config.tokenKey,
        {
            expiresIn: config.tokenTime
        }
    )
    cb(null, token)
}

exports.decodeOnlyToken = async function (token, header, cb) {
    console.log("token" +config.tokenKey);
    jwt.verify(token, config.tokenKey, (err, decoded) => {
        if (err) {
            console.log("err" + err);
            cb(err, null)
        }
        else {
            if (decoded.user && decoded.userAgent == header) {
                cb(null, decoded.user)
            }
            else {
                cb({
                    err: "Token is invalid",
                    msg: "Either userAgent or token is not valid"

                },
                    null
                )
            }
        }
    })
}