const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/job');

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

const getJobIDFromURL = (url) => {
    const regexpID = /job_id=([0-9]*)/;
    const match = url.match(regexpID);
    return +match[1];
}

const getJobTypeFromURL = (url) => {
    const regexpJobType = /job_type=(.)/;
    const match = url.match(regexpJobType);
    if (match[1] === "A") return "Academic Year";
    if (match[1] === "S") return "Summer";
    return "Unknown";
}

const refreshJobs = async (req, res, next) => {
    console.log("Attempting to sync job database...");
    try {
        const jobURLs = [];
        const allCurrentJobs = [];

        const baseURL = "https://web.wpi.edu";
        const academicJobsWebsite = "https://web.wpi.edu/webapps/student-jobs/academic-jobs.html";
        const summerJobsWebsite = "https://web.wpi.edu/webapps/student-jobs/summer-jobs.html";

        // pull all academic year job URLs
        await axios(academicJobsWebsite).then((response) => {
            const data = response.data;
            const $ = cheerio.load(data);

            $('div#content.clearfix ul li a').each(function (i, elem) {
                jobURLs.push(baseURL + $(this).attr('href'));
            });
        });

        // pull all summer job URLs
        await axios(summerJobsWebsite).then((response) => {
            const data = response.data;
            const $ = cheerio.load(data);

            $('div#content.clearfix ul li a').each(function (i, elem) {
                jobURLs.push(baseURL + $(this).attr('href'));
            });
        });

        // job attribute matcher
        const jobQueries = [
            { stringMatch: "Position Title:", jobAttribute: "positionTitle" },
            { stringMatch: "Department:", jobAttribute: "department" },
            { stringMatch: "Location:", jobAttribute: "location" },
            { stringMatch: "Students Required:", jobAttribute: "studentsRequired" },
            { stringMatch: "Hours per week:", jobAttribute: "hoursPerWeek" },
            { stringMatch: "Federal Funding:", jobAttribute: "federalFunding" },
            { stringMatch: "Job Description:", jobAttribute: "jobDescription" },
            { stringMatch: "Requirements:", jobAttribute: "requirements" },
            { stringMatch: "Contact Person:", jobAttribute: "contact" },
            { stringMatch: "Email:", jobAttribute: "email" },
            { stringMatch: "Phone:", jobAttribute: "phone" },
        ];
        // pull all jobs
        for (let i = 0; i < jobURLs.length; i++) {
            let jobURL = jobURLs[i];
            let job = { _id: getJobIDFromURL(jobURL), jobType: getJobTypeFromURL(jobURL) };
            await axios(jobURL).then((response) => {
                const data = response.data;
                const $ = cheerio.load(data);

                $('div#container.clearfix tbody tr').each(function (i, elem) {

                    for (let j = 0; j < jobQueries.length; j++) {
                        const jobQuery = jobQueries[j];
                        $(this).children('th').filter(function (i, elem) {
                            return $(this).text() === jobQuery.stringMatch;
                        }).each(function (i, elem) {
                            job[jobQuery.jobAttribute] = $(this).parent().children('td').text().trim();
                        });
                    }

                });
            });

            job.studentsRequired = +job.studentsRequired;
            job.hoursPerWeek = +job.hoursPerWeek;
            job.federalFunding = (job.federalFunding === "Required");

            allCurrentJobs.push(job);
        }

        let numberJobsNew = 0;
        let numberJobsUpdated = 0;
        let numberJobsDeleted = 0;
        let numberJobsUnchanged = 0;

        // get old jobs to compare changes
        let allOldJobs = {};
        Job.find({}, function (err, jobs) {
            jobs.forEach(function (job) {
                allOldJobs[job._id] = job;
            });


            // run comparisions and save/update/keep same
            for (let i = 0; i < allCurrentJobs.length; i++) {
                let currentJob = allCurrentJobs[i];

                if (allOldJobs[currentJob._id]) {
                    // job is old
                    if (JSON.stringify(allOldJobs[currentJob._id]) === JSON.stringify(currentJob)) {
                        // job is unchanged
                        numberJobsUnchanged++;
                    } else {
                        // job is updated
                        numberJobsUpdated++;
                        Job.findByIdAndUpdate(currentJob._id, currentJob, (err, updatedJob) => {
                        });
                    }
                    allOldJobs[currentJob._id].wasPresent = true;
                } else {
                    // job is new
                    numberJobsNew++;
                    let currentJobDoc = new Job(currentJob);
                    currentJobDoc.save();
                }
            }

            // delete unused jobs from old set
            for (let key in allOldJobs) {
                if (allOldJobs.hasOwnProperty(key)) {
                    let oldJob = allOldJobs[key];
                    if (oldJob._id) {
                        if (oldJob.wasPresent === undefined) {
                            // delete
                            numberJobsDeleted++;
                            oldJob.remove();
                        }
                    }
                }
            }

            console.log(`Database sync complete. ${numberJobsNew} jobs added, ${numberJobsUpdated} jobs updated, ${numberJobsUnchanged} jobs unchanged, and ${numberJobsDeleted} jobs deleted.`);

        }).select("-createdAt -updatedAt -__v");

    } catch (error) {
        console.log("Error Updating Database");
        console.log(error, error.message);
        res.status(500).json({
            errror: error.message
        });
    }

}

module.exports = { findJobById, findJob, findAllJobs, refreshJobs };