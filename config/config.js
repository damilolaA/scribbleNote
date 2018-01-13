var config = {

	development: {
		port: 2000,
		database: "mongodb://mongo:27017/note",
		secret: "mickey",
		expiry: 604800
	},
	
	production: {
		port: process.env.PORT || 2000,
		database: process.env.MONGOLAB_URI || "mongodb://localhost/note",
		secret: "mickey",
		expiry: 604800
	}
}

module.exports = config;