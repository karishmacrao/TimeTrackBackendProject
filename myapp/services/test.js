var express = require('express');
var router = express.Router();
var Joi = require('@hapi/joi');
var bcrypt = require('bcrypt');
var test = require('../_helpers/schema');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');


router.post('/login', async function (req, res, err) {

    //  Validation for email and password
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let user = await test.findOne({ email: req.body.email });
    if (!user) {
        return res.send(responseMessage(err, 400, 'Incorrect email.'))
    }

    // Then validate the Credentials in MongoDB 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.send(responseMessage(err, 400, 'Incorrect password.'))
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), { expiresIn: config.expiresIn });
    function responseMessage(data = {}, code, message) {
        return ({
            code: code,
            message: message,
            data: data,
        })
    }
    res.send(responseMessage(
        {
            data: _.pick(user, ['_id', 'firstName', 'lastName', 'email'])
        },
        200, 'Successfully logged IN!!', { token: token }))
});

function validate(req) {
    const schema = {
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    };
    return Joi.validate(req, schema);
}

module.exports = router;


var express = require('express');
var router = express.Router();
var test = require('../_helpers/schema');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const saltRounds = 12;

function responseMessage(data = {}, code, message) {
  return ({
    code: code,
    message: message,
    data: data
  })
}

// user registration
router.post('/signup', async function (req, res, next) {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),

    // Minimum six characters, at least one letter, one number and one special character:
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/),
  })
  const result = Joi.validate(req.body, schema);
  console.log(result.error)
  if (result.error == null) {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      if (err)
        throw err;
      else {
        result.value.password = hash
        var insert = new test(result.value);
        insert.save((err, data) => {
          if (err) {
            console.log(err)
            res.send(responseMessage(err, 400, 'Failed to add!!'))
          }
          res.send(responseMessage(data, 200, 'Successfully added the user!!'))
          console.log(data);
        })
      }
    });
  } else {
    res.send(responseMessage(error, 400, 'Error!'))
  }
});

module.exports = router;