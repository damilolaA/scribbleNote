var config = {
	port: process.env.PORT || 2000,
	database: process.env.MONGOLAB_URI || "mongodb://localhost/note" || "mongodb://mongo:27017/note"
}

module.exports = config;