var config = {
	port: process.env.PORT || 2000,
	database: process.env.MONGOLAB_URI || "mongodb://localhost/note"
}

module.exports = config;