var noteModel = require("./notes-model.js"),
	userModel = require("../users/user-model.js");

exports.interceptId = function(req, res, next, id) {

	noteModel.findById(id)
	.then(function(data) {
		if(!data) {
			return next(new Error("....."))
		}

		req.note = data;
		next()

	}, function(err) {
		return next(err);
	})
}

exports.addNote = (req, res, next) => {

	var id = req.user.id;

	userModel.findById(id, (err, info) => {

		if(err) {return next(new Error("could not fetch user by id"))}

		var data = req.body;
		data.users = id;

		var note = new noteModel(data)
		note.save(function(err, msg) {

			if(err) {
				return next(new Error("cannot add note"))
			}

			noteModel.find({})
				.populate('users')
				.exec(function(err, item) {

					res.status(200).json(item)
				})
		})
	})
}

exports.fetchNotes = function(req, res, next) {

	noteModel.find((err, data) => {
		if(err) {
			return next(new Error("cannot fetch notes"))
		}

		res.status(200).json(data)
	})
}

exports.getNote = function(req, res, next) {

	if(!req.note) { return next(new Error("cannot get note")) }

	res.status(200).json(req.note);
}

exports.updateNote = function(req, res, next) {

	noteModel.update({id: req.note._id}, req.body, function(err, data) {

		if(err) {
			return next(new Error("cannot update note"))
		}

		res.status(200).json(req.note)
	})
}

exports.deleteNote = function(req, res, next) {

	noteModel.remove({id: req.note._id}, (err, data) => {

		if(err) {
			return next(new Error("note cannot be deleted"))
		}
	})

	res.status(200).json(req.note)
}