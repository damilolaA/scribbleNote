var express = require("express"),
	router  = express.Router(),
	auth	= require("./auth.js");

router.route("/")
	.post(auth.verifyUser)

module.exports = router;
