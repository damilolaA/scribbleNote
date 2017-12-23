var express    = require("express"),
	router     = express.Router(),
	controller = require("./user-controller.js");

router.param("id", controller.interceptIds);

router.route("/")
	.get(controller.fetchUsers)
	.post(controller.addUser)

router.route("/:id")
	.get(controller.getUser)
	.put(controller.updateUser)
	.delete(controller.deleteUser)


module.exports = router;