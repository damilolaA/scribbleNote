var app     = require("./server/server.js"),
	config  = require("./config/config.js")[process.env.NODE_ENV || 'development'],
	port    = config.port,
	express = require("express");


app.use(express.static(__dirname + "/www"));

app.listen(port, function(err) {
	if(err) {return console.log(err);}

	console.log("server started");
})