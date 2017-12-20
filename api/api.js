var express    = require("express"),
	api		   = express.Router(),
	userRouter = require("./v1/users/user-router.js"),
	authRouter = require("./v1/auth/auth-router.js");

api.use("/users", userRouter);
api.use("/auth", authRouter);

module.exports = api;