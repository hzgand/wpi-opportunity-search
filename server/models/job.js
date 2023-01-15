const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobType: {
        type: String,
        required: true
    },
    positionTitle: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    studentsRequired: {
        type: Number,
        required: true
    },
    hoursPerWeek: {
        type: Number,
        required: true
    },
    federalFunding: {
        type: Boolean,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

jobSchema.index({positionTitle: 'text', jobDescription: 'text'});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;