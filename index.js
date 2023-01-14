require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./server/config');

require('./server/config/dbConnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});