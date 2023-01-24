const express = require('express');
const {findJobById, findJob, findAllJobs} = require('../controllers/job');

const router = express.Router();

router.route('/api/jobs')
.get(findAllJobs)

router.route('/api/jobs/:jobId')
.get(findJob)

router.param('jobId', findJobById);

module.exports = router;