const mongoose = require('mongoose');
const config = require("./index")

const URI = config.mongoURI;
mongoose.connect(URI);

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
    console.log("Unnable to connect to MongoDB : " + err);
});