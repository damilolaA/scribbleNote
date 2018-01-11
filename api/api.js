var express    = require("express"),
	api		   = express.Router(),
	userRouter = require("./v1/users/user-router.js"),
	authRouter = require("./v1/auth/auth-router.js"),
	noteRouter = require("./v1/notes/notes-router.js");

api.use("/users", userRouter);
api.use("/auth", authRouter);
api.use("/notes", noteRouter);

module.exports = api;