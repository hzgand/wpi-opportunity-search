require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./server/config');
const path = require('path');

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

console.log(path.join(__dirname, 'frontend', 'build'));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});