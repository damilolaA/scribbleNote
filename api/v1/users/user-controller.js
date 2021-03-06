var userModel = require("./user-model.js"),
	moment	  = require("moment"),
	noteModel = require("../notes/notes-model.js");

exports.interceptIds = function(req, res, next, id) {

	userModel.findById(id, function(err, data) {
		if(err) {return next(new Error("...."))}

		req.user = data;
		next()
	})
}

exports.addUser = function(req, res, next) {
	var user = req.body,
		email = req.body.email;

	var newUser = new userModel(user);

	userModel.findOne({email: email}, (err, data) => {
		if(err) {
			return next(new Error("...."))
		}

		if(data !== null) {

			return next(new Error("email exists already"))
		} else {
			newUser.save((err, data) => {
				if(err) {
					return next(new Error("could not add person"))
				}

				res.status(200).json(data)
			})	
		}
	})	
}

exports.getUserNote = function(req, res, next) {

	var id = req.user.id;

	if(!req.user) {
		return next(new Error("cannot get users note"))
	}

	noteModel.find({users : id})
		.then(function(response) {

			var info = [];

			response.forEach(function(data) {
				
				data = data.toJSON();

				var newDate = moment(data.date).format('YYYY-DD-MM');

				data.date = newDate;

				info.push(data);
			})

			res.status(200).json(info)

		})
		.catch(function(err) {
			return next(new Error("cannot fetch user's data"))
		})
}

/*exports.getUser = function(req, res, next) {

	if(!req.user) {
		return next(new Error("cannot get user"))
	}

	res.status(200).json(req.user);
}*/

exports.fetchUsers = function(req, res, next) {

	userModel.find(function(err, data) {
		if(err) {
			return next(new Error("could not fetch users"))
		}

		res.status(200).json(data);
	})
}

exports.deleteUser = function(req, res, next) {

	userModel.remove({_id: req.user._id}, (err, res) => {
		if(err) {
			return next(new Error("user could not be deleted"))
		}
	})

	res.status(200).json(req.user);
}

exports.updateUser = function(req, res, next) {

	userModel.update({_id: req.user._id}, req.body, {new: true}, (err, data) => {
		if(err) {
			return next(new Error("cannot update user info"))
		}

		res.status(200).json(data);
	})
}