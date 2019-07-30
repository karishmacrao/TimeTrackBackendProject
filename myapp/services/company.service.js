const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const jwt = require('../helpers/jwt');

const Company = db.Company;
module.exports = {
    addComapny,
    getCompany,
    getAllCompany
};

async function getCompany(id) {
    return await Company.findById(id);
    // const user = await User.findById(id);
    // return await User.findOne({ id: userParam.id });
}


async function addComapny(companyParam) {
    if (await User.findOne({ companyId: companyParam.companyId })) {
        throw 'Company ID "' + companyParam.companyId + '" is already taken';
    }
}

async function getAllCompany() {
    return await Company.find();
}