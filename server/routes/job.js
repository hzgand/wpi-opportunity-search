const express = require('express');
const {addJob, findJobById, findJob, findAllJobs, updateJob, deleteJob} = require('../controllers/job');

const router = express.Router();

router.route('/api/jobs')
.get(findAllJobs)
.post(addJob);

router.route('/api/jobs/:jobId')
.get(findJob)
.put(updateJob)
.delete(deleteJob);

router.param('jobId', findJobById);

module.exports = router;