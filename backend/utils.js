const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const config = {
	app: {
		PORT: process.env.PORT,
		JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
	},
	db: {
		DBSTR: process.env.DBSTR,
		// host: 'localhost',
		// port: 27017,
		// name: 'db'
	}
};

module.exports = config;