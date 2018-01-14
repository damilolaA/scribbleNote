var express = require("express"),
	router  = express.Router(),
	controller = require("./notes-controller.js");

router.param("id", controller.interceptId);

router.route("/")
	.post(controller.addNote)
	.get(controller.fetchNotes)

router.route("/:id")
	.get(controller.getNote)
	.put(controller.updateNote)
	.delete(controller.deleteNote)


module.exports = router;
