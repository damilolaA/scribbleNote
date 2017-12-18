var userModel = require("./user-model.js");

exports.interceptIds = function(req, res, next, id) {

	userModel.findById(id, function(err, data) {
		if(err) {return next(new Error("...."))}

		req.user = data;
		next()
	})
}

exports.addUser = function(req, res, next) {
	var user = req.body;

	var newUser = new userModel(user);
	newUser.save(function(err, data) {
		if(err) {
			return next(new Error("could not add user"))
		}

		res.status(200).json(data)
	})
}

exports.getUser = function(req, res, next) {

	if(!req.user) {
		return next(new Error("could not get user"))
	}

	res.status(200).json(data)
}

exports.fetchUsers = function(req, res, next) {

	userModel.find(function(err, data) {
		if(err) {
			return next(new Error("could not fetch users"))
		}

		res.status(200).json(data);
	})
}