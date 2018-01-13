var mongoose    = require("mongoose"),
	config      = require("../../../config/config.js"),
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