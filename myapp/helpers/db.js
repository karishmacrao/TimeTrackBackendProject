const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/timetrack", { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user.model'),
  Company : require('../models/company.model'),
  Project : require('../models/project.model')
};