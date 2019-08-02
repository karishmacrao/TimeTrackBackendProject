var express = require('express');
const router = express.Router();
const companyCtrl = require('../controllers/company.controller');
const middleware = require('../middlewares/middleware');

router.use(middleware.checkToken);
router.get('/getcompany',companyCtrl.getCompany)
router.post('/addcompany',companyCtrl.addCompany);
router.get('/allcompany',companyCtrl.getAllCompany);
router.delete('/delete/:id',companyCtrl.deleteCompany);
module.exports = router;