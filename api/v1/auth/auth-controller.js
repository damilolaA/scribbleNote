var auth = require("./auth.js");

exports.signIn = (req, res, next) => {
	var token = auth.signToken(req.user._id);

	req.user.token = token;
	
	res.status(200).json(req.user)
}