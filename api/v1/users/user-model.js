 var mongoose = require("mongoose"),
 	 bcrypt	  = require("bcrypt"),
 	userSchema;

 mongoose.connect("mongodb://mongo:27017/note");

userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	data	: {type: Date, default: Date.now}
})

userSchema.pre("save", function(next) {
	this.password = this.encryptPassword(this.password);
	next()
})

userSchema.methods = {

	encryptPassword: function(plainText) {
		if(!plainText) { return "";}

		var salt = bcrypt.genSaltSync();
		return bcrypt.hashSync(plainText, salt);
	},

	authenticate: function(plainText) {
		return bcrypt.compareSync(plainText, this.password)
	}
}

module.exports = mongoose.model("user", userSchema);