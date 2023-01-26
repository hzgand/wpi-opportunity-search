const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/job');

const { syncJobsDatabase } = require('../scheduledFunctions/syncJobs');

const addJob = (req, res, next) => {
    const job = new Job(req.body);
    job.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Error creating new job listing"
            });
        }
        res.status(200).json({
            message: "Created new job listing successfully"
        });
    });
};

const findJobById = (req, res, next, id) => {
    Job.findById(id).exec((err, job) => {
        if (err || !job) {
            return res.status(400).json({
                error: "No Job found with that ID"
            });
        }
        req.job = job;
        next();
    });
};

const findJob = (req, res) => {
    return res.json(req.job);
};

const findAllJobs = (req, res) => {
    if (Object.keys(req.query).length === 0) {

        // No search parameters
        Job.find({}, (err, jobs) => {
            return res.json(jobs);
        });

    } else {

        // Parse search parameters

        const jobQuery = {};

        // q: text search on job title and description
        if (req.query.q) {
            jobQuery.$text = { $search: req.query.q };
        }

        // job type: string
        if (req.query.jobtype) {
            jobQuery.jobType = req.query.jobtype;
        }

        // position title: string
        if (req.query.positiontitle) {
            jobQuery.positionTitle = req.query.positiontitle;
        }

        // department: string
        if (req.query.department) {
            jobQuery.department = req.query.department;
        }

        // location: string
        if (req.query.location) {
            jobQuery.location = req.query.location;
        }

        // hours per week
        // less than or equal to
        if (req.query.hourslte) {
            if (!jobQuery.hoursPerWeek) jobQuery.hoursPerWeek = {};
            jobQuery.hoursPerWeek.$lte = req.query.hourslte;
        }

        // greater than or equal to
        if (req.query.hoursgte) {
            if (!jobQuery.hoursPerWeek) jobQuery.hoursPerWeek = {};
            jobQuery.hoursPerWeek.$gte = req.query.hoursgte;
        }

        // federalfunding: true/false
        if (req.query.federalfunding) {
            jobQuery.federalFunding = req.query.federalfunding;
        }

        Job.find(jobQuery).exec((err, jobs) => {
            if (err) {
                res.status(400).json({
                    error: "Could not find jobs"
                });
            }
            return res.json(jobs);
        });

    }
}

const updateJob = (req, res) => {
    let job = req.job;
    Job.findByIdAndUpdate(job._id, req.body, (err, updatedJob) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to update job"
            });
        }
        res.json({
            message: "Successfully updated job"
        });
    });
};

const deleteJob = (req, res, next) => {
    let job = req.job;
    job.remove((err, deletedJob) => {
        if (err) {
            return res.status(400).json({
                error: "Could not delete job"
            });
        }
        res.json(job);
    });
};

const findAllDepartments = (req, res) => {
    Job.distinct('department', function(err, result) {
        if (err) {
            return res.status(400).json({
                error: "Could not fetch departments"
            });
        }
        res.json(result);
    });
};

const refreshJobs = async (req, res) => {
    if(process.env.JOBSYNC_AUTH !== undefined && req.get("Authorization") === process.env.JOBSYNC_AUTH) {
        await syncJobsDatabase(req, res);
    } else {
        res.status(400).json({
            error: "Invalid Authorization"
        });
    }
};

module.exports = { findJobById, findJob, findAllJobs, findAllDepartments, refreshJobs };