var noteModel = require("./notes-model.js");


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

	var data = req.body

	var note = new noteModel(data)
	note.save(function(err, msg) {
		if(err) {
			return next(new Error("cannot add note"))
		}

		res.status(200).json(msg)
	})
}

exports.fetchNotes = function(req, res, next) {

	noteModel.find(function(err, data) {
		if(err) {
			return next(new Error("cannot fetch all notes"))
		}

		res.status(200).json(data);
	})
}

exports.getNote = function(req, res, next) {

	if(!req.note) { return next(new Error("cannot get note")) }

	res.status(200).json(req.note);
}