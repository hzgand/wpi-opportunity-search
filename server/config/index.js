const config = {
	port: process.env.PORT || 4000,
	jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
	mongoURI: process.env.MONGODB_URI || 'mongodb://localhost/job-app'
};

module.exports = config;