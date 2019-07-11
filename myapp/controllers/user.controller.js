const router = require('../routers/router');
const userService = require('../services/user.service');

exports.login = function(req, res, next) {
    const header = req.headers['user-agent'];
    userService.login(req.body,header)
        .then(user => 
             { 
                 user ? res.json(user) : res.status(400).json({ message: 'Username or password incorrect' })
             })
        .catch(err => next(err));

}

exports.register = function (req, res, next) {
    userService.addEmp(req.body)
        .then(() => res.send("Registration successful!"))
        .catch(err => next(err));
}

exports.getAllEmps = function(req,res,next){
    userService.getAllEmps()
    .then(()=>res.send(users))
    .catch(err=>next(err)); 
}

exports.getEmp = function(req,res,next){
    userService.getEmp(req.params.username)
    .then(()=>res.send(user))
    .catch(err=>next(err)); 
}

exports.updateById = function(req,res,next){
    userService.updateById(req.params.id,req.body)
    .then(()=>res.send(user))
    .catch(err=>next(err)); 
}

exports.delete = function(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json("Deleted Successfully!"))
        .catch(err => next(err));
}