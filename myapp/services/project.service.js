const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const jwt = require('../helpers/jwt');

const Project = db.Project;
module.exports = {
    addProject,
    getProject,
    deleteAllProject,
    deleteProject,
    getAllProject
};

async function getProject(id) {
    console.log(id);
    return await Project.findById(id);

    // const user = await User.findById(id);
    // return await User.findOne({ id: userParam.id });
}
async function deleteProject(id) {
    await Project.findById(id).findOneAndRemove(id);
}
async function deleteAllProject(compId) {
    await Project.deleteMany({ companyId : compId })
}

async function addProject(projectParam) {
    if (await Project.findOne({ projectId: projectParam.projectId })) {
        throw 'Project ID "' + projectParam.projectId + '" is already taken';
    }
    const project = new Project(projectParam);

    await project.save();
}

async function getAllProject() {
    return await Project.find();
}