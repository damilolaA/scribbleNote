var mongoose    = require("mongoose"),
	config      = require("../../../config/config.js"),
	databaseUrl = config.database,
	noteSchema;

mongoose.connect(databaseUrl)

noteSchema = new mongoose.Schema({
	title: {type: String, required: true},
	note: {type: String, required: true},
	date: {type: Date, default: Date.now},
	users: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model("note", noteSchema);