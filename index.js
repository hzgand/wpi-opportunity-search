require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./server/config');

const jobRoutes = require("./server/routes/job");

const scheduledFunctions = require('./server/scheduledFunctions/syncJobs');

require('./server/config/dbConnection');

scheduledFunctions.initScheduledJobs();

const app = express();

app.use(morgan('common'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/', jobRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});