const router = require('../routers/router');
const projectService = require('../services/project.service');

exports.addProject = function (req, res, next) {
    projectService.addProject(req.body)
        .then(project => {
            res.json({ message: "Added Project successful!" })
        })
        .catch(err => next(err));

}

exports.getAllProject = function (req, res, next) {
    projectService.getAllProject()
        .then(projects => { res.json(projects) })
        .catch(err => next(err));
}
exports.deleteProject = function (req, res, next) {
    console.log("delete");
    projectService.deleteProject(req.params.id)
        .then(project => res.json({ message: "Project Deleted Successfully" }))
        .catch(err => next(err));
}

exports.deleteAllProject = function (req, res, next) {
    console.log("deleteAllProject");
    projectService.deleteAllProject(req.params.companyId)
        .then(project => res.json({ message: "All Project Deleted Successfully" }))
        .catch(err => next(err));
}

exports.getProject = function (req, res, next) {
    console.log("getProject " + req.params.id);
    projectService.getProject(req.params.id)
        .then(project => { res.json(project) })
        .catch(err => next(err));
}