const CronJob = require("node-cron");
const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/job');

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

const refreshJobs = async () => {
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
    }

}

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("0 0,6,12,18 * * *", () => {
    refreshJobs();
  });

  scheduledJobFunction.start();
}