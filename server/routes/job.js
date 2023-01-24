const express = require('express');
const {findJobById, findJob, findAllJobs, refreshJobs} = require('../controllers/job');

const router = express.Router();

router.route('/api/jobs')
.get(findAllJobs)

router.route('/api/jobs/:jobId')
.get(findJob)

router.route('/api/jobs-refresh')
.get(refreshJobs)

router.param('jobId', findJobById);

module.exports = router;