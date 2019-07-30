var router = require('express').Router();

router.use('/user', require('./user.route'));
router.use('/company', require('./company.route'));
module.exports = router;