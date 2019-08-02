const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const jwt = require('../helpers/jwt');

const Company = db.Company;
module.exports = {
    addCompany,
    getCompany,
    deleteCompany,
    getAllCompany
};

async function getCompany(id) {
    return await Company.findById(id);
    // const user = await User.findById(id);
    // return await User.findOne({ id: userParam.id });
}
async function deleteCompany(id)
{
    await Company.findById(id).findOneAndRemove(id);
}


async function addCompany(companyParam) {
    if (await Company.findOne({ companyId: companyParam.companyId })) {
        throw 'Company ID "' + companyParam.companyId + '" is already taken';
    }
    const company = new Company(companyParam);

    await company.save();
}

async function getAllCompany() {
    return await Company.find();
}