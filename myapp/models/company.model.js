const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName:
    {
        type: String,
        required: true
    },
    location:
    {
        type: String,
        required: true
    },
    companyId:
    {
        type: String,
        unique: true,
        required: true
    }

});

companySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Company', companySchema);