var express    = require("express"),
	router     = express.Router(),
	controller = require("./notes-controller.js"),
	auth	   = require("../auth/auth.js");

router.param("id", controller.interceptId);

router.route("/")
	.post(auth.decodeToken, controller.addNote)
	.get(auth.decodeToken, controller.fetchNotes)

router.route("/:id")
	.get(auth.decodeToken, controller.getNote)
	.put(auth.decodeToken, controller.updateNote)
	.delete(auth.decodeToken, controller.deleteNote)


module.exports = router;
