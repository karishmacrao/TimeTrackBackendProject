
var express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const middleware = require('../middlewares/middleware');

router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.use(middleware.checkToken);
router.get('/all', userCtrl.getAllEmps);
router.get('/:id?', userCtrl.getEmp);
router.put('/:id', userCtrl.updateById);
router.delete('/:id', userCtrl.delete);

module.exports = router;
