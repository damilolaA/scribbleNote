var config = {
	port: process.env.PORT || 2000,
	database: process.env.MONGOLAB_URI || "mongodb://mongo:27017/note" || "mongodb://192.168.99.100:27017/note"
}

module.exports = config;