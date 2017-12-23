var userModel = require("../users/user-model.js");

exports.verifyUser = function(req, res, next) {

	var username = req.body.username,
		password = req.body.password;

	if(!username || !password) {
		return next(new Error("please enter your username and password"))
	}

	userModel.findOne({username: username}, (err, data) => {
		if(err) { return next(new Error("cannot login user")) }

		if(!data.authenticate(password)) {
			return next(new Error("incorrect username and/or password"))
		}

		data = data.toObject();
		data["msg"] = "Login successful";

		res.status(200).json(data);
	});
}