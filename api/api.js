var express    = require("express"),
	api		   = express.Router(),
	userRouter = require("./users/user-router.js");

api.use("/users", userRouter);

module.exports = api;