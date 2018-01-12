var express = require("express"),
	router  = express.Router(),
	auth	= require("./auth.js"),
	controller = require("./auth-controller.js");

router.route("/")
	.post(auth.verifyUser, controller.signIn);

module.exports = router;
