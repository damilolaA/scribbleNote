var express    = require("express"),
	api		   = express.Router(),
	userRouter = require("./v1/users/user-router.js");

api.use("/users", userRouter);

module.exports = api;