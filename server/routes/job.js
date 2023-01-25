const express = require('express');
const {findJobById, findJob, findAllJobs, findAllDepartments} = require('../controllers/job');

const router = express.Router();

router.route('/api/jobs')
.get(findAllJobs)

router.route('/api/jobs/departments')
.get(findAllDepartments);

router.route('/api/jobs/:jobId')
.get(findJob)

router.param('jobId', findJobById);

module.exports = router;