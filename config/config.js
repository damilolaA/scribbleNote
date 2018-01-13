var config = {

	development: {
		port: 2000,
		database: "mongodb://localhost/note",
		secret: "mickey",
		expiry: 604800
	},
	
	production: {
		port: process.env.PORT || 2000,
		database: process.env.MONGOLAB_URI,
		secret: "mickey",
		expiry: 604800
	}
}

module.exports = config;