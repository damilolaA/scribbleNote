var app = require("./server/server.js");


app.listen(2000, function(err) {
	if(err) {return err;}

	console.log("server started");
})