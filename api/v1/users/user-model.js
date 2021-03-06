var mongoose 	 = require("mongoose"),
 	bcrypt	  	 = require("bcrypt-nodejs"),
 	config   	 = require("../../../config/config.js"),
 	databaseUrl  = config.database,
 	Schema       = mongoose.Schema,
 	userSchema;

 mongoose.connect(databaseUrl);

userSchema = new Schema({
	email: {type: String, required: true, unique:true},
	password: {type: String, required: true},
	date	: {type: Date, default: Date.now}
})

userSchema.pre("save", function(next) {
	this.password = this.encryptPassword(this.password);
	next()
})

userSchema.methods = {

	authenticate: function(plainText) {
		return bcrypt.compareSync(plainText, this.password)
	},
	
	encryptPassword: function(plainText) {
		if(!plainText) { return "";}

		var salt = bcrypt.genSaltSync();
		return bcrypt.hashSync(plainText, salt);
	}
}

module.exports = mongoose.model("user", userSchema);