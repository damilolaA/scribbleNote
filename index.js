var http = require("http");

var app = http.createServer(function(req, res) {
	console.log("Hello World");
})

app.listen(2000, function(err) {
	if(err) {return err;}

	console.log("server started");
})