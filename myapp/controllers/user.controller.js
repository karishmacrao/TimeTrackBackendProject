const router = require('../routers/router');
const userService = require('../services/user.service');

exports.login = function (req, res, next) {
    const header = req.headers['user-agent'];
    userService.login(req.body, header)
        .then(user => {
            user ? res.json(user) : res.status(400).json({ message: 'Username or password incorrect' })
        })
        .catch(err => next(err));

}
exports.register = function (req, res, next) {

    userService.addEmp(req.body)
        .then(user => {
            res.json({ message: "Registration successful!" })
        })
        .catch(err => next(err));
}

exports.getAllEmps = function (req, res, next) {
    userService.getAllEmps()
        .then(users => { res.json(users) })
        .catch(err => next(err));
}

exports.getEmp = function (req, res, next) {
    console.log("getEmp");
    userService.getEmp(req.params.id)
        .then(user => { res.send(user) })
        .catch(err => next(err));
}

exports.updateById = function (req, res, next) {
    userService.updateById(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

exports.deleteById = function (req, res, next) {
    console.log("ID " + req.params.id);
    userService.delete(req.params.id)
        .then(user => res.json({ message: "Deleted successfully" }))
        .catch(err => next(err));
}