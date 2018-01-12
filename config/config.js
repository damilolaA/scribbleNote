var config = {
	port: process.env.PORT || 2000,
	database: process.env.MONGOLAB_URI || "mongodb://mongo:27017/note" || "mongodb://localhost/note",
	secret: "mickey",
	expiry: 604800
}

module.exports = config;