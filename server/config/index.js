require('dotenv').config();

const mongoUSER = process.env.MONGODB_USER;
const mongoPASS = process.env.MONGODB_PASS;

const config = {
	port: process.env.PORT || 4000,
	jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
	mongoURI: process.env.MONGODB_URI || `mongodb+srv://${mongoUSER}:${mongoPASS}@cluster0.ha0me1n.mongodb.net/test`
};

module.exports = config;