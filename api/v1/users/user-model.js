 var mongoose = require("mongoose"),
 	userSchema;

 mongoose.connect("mongodb://mongo:27017/note");

userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	data	: {type: Date, default: Date.now}
})

module.exports = mongoose.model("user", userSchema);