var express    = require("express"),
	router     = express.Router(),
	controller = require("./user-controller.js"),
	auth	   = require("../auth/auth.js");

router.param("id", controller.interceptIds);

router.route("/")
	.get(controller.fetchUsers)
	.post(controller.addUser)

router.route("/:id")
	.get(auth.decodeToken, controller.getUserNote)
	.put(controller.updateUser)
	.delete(controller.deleteUser)


module.exports = router;