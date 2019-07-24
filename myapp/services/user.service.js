const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const jwt = require('../helpers/jwt');
const User = db.User;
module.exports = {
    login,
    addEmp,
    getAllEmps,
    getEmp,
    updateById,
    delete: deleteById
};

async function login({ username, password }, header) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {

        const token  = await generateToken(user, header);
        return {user, token};

    }
}

async function generateToken(user, header) {
     let token = null

     await jwt.createToken(user.id, header,(err,data)=>{
        token = data;
    });

    return token;
}

async function getAllEmps() {
    return await User.find();
}

async function getEmp(id) {
     return await User.findById(id);
    // const user = await User.findById(id);
    // return await User.findOne({ id: userParam.id });
}

async function addEmp(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

async function deleteById(id) {
    await User.findOneAndDelete(id);
}

async function updateById(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User Not Found!'
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }
    Object.assign(user, userParam);

   return await user.save();
}