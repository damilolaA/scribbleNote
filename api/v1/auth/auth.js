var userModel   = require("../users/user-model.js"),
	expressjwt = require("express-jwt"),
	jwt         = require("jsonwebtoken"),
	config		= require("../../../config/config.js");

/*function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}*/

exports.verifyUser = function(req, res, next) {

	var email    = req.body.email,
		password = req.body.password;

	email = decodeURIComponent(email);
	//console.log(email);

	if(!email || !password) {
		return next(new Error("please enter your email address and password"))
	}

	userModel.findOne({email: email}, function(err, data) {
		if(err) { return next(new Error("cannot login user")) }

		if(!data.authenticate(password)) {
			return next(new Error("incorrect email and/or password"))
		} 
		
		data = data.toObject();
		data["msg"] = "Login successful";

		req.user = data;
		next()
	});	
}

exports.signToken = function(id) {
	return jwt.sign(
		{id: id},
		config.secret,
		{expiresIn: config.expiry}
	);
}