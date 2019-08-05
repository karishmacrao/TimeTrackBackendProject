var express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/project.controller');
const middleware = require('../middlewares/middleware');

router.use(middleware.checkToken);
router.get('/getproject/:id',projectCtrl.getProject)
router.post('/addproject',projectCtrl.addProject);
router.get('/allproject',projectCtrl.getAllProject);
router.delete('/delete/:id',projectCtrl.deleteProject);
router.delete('/deleteall/:companyId',projectCtrl.deleteAllProject);
module.exports = router;