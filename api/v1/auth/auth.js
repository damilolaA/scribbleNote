var userModel = require("../users/user-model.js");

exports.verifyUser = function(req, res, next) {

	var email    = req.body.email,
		password = req.body.password;

	if(!email || !password) {
		return next(new Error("please enter your email address and password"))
	}

	userModel.findOne({email: email}, (err, data) => {
		if(err) { return next(new Error("cannot login user")) }
		console.log(data);
	
		if(!data.authenticate(password)) {
			return next(new Error("incorrect email and/or password"))
		}

		data = data.toObject();
		data["msg"] = "Login successful";

		res.status(200).json(data);
	});
}