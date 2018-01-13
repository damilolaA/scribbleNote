var mongoose    = require("mongoose"),
	config      = require("../../../config/config.js")[process.env.NODE_ENV || 'development'],
	databaseUrl = config.database,
	noteSchema;

mongoose.connect(databaseUrl)

noteSchema = new mongoose.Schema({
	email: {type: String, required:true},
	title: {type: String, required: true},
	note: {type: String, required: true},
	date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("note", noteSchema);