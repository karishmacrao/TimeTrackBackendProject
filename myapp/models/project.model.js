const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName:
    {
        type: String,
        required: true
    },
    companyId:
    {
        type: String,
        required: true
    },
    projectId:
    {
        type: String,
        unique: true,
        required: true
    },
    projectHead:
    {
        type: String,
        unique: true,
        required: true
    }
});

projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);