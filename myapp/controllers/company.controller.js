const router = require('../routers/router');
const companyService = require('../services/company.service');

exports.addCompany = function (req, res, next) {
    companyService.addCompany(req.body)
        .then(company => {
            res.json({ message: "Added company successful!" })
        })
        .catch(err => next(err));

}

exports.getAllCompany = function (req, res, next) {
    companyService.getAllCompany()
        .then(companys => { res.json(companys) })
        .catch(err => next(err));
}
exports.deleteCompany = function (req, res, next) {
    console.log("delete");
    companyService.deleteCompany(req.params.id)
        .then(company => res.json({ message: "Company Deleted Successfully" }))
        .catch(err => next(err));
}

exports.getCompany = function (req, res, next) {
    console.log("getcompany");
    companyService.getCompany(req.params.id)
        .then(company => { res.send(company) })
        .catch(err => next(err));
}