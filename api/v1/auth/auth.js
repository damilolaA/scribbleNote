var userModel = require("../users/user-model.js");

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

		res.status(200).json(data);
	});	
}

/*userModel.findOne({email: email}).then(function(person) {
		if(!person) {return next(new Error("User not found"))};

		//console.log(person);
		if(!person.authenticate(password)) {
			return next(new Error("invalid username and/or password"))
		}

		person = person.toObject();
		person["msg"] = "Login successful";
		res.status(200).json(person)
	}, function(err) {
		return next(err);
	})*/