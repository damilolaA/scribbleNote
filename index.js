var app = require("./server/server.js"),
	express = require("express");


app.use(express.static(__dirname + "/www"));

app.listen(2000, function(err) {
	if(err) {return console.log(err);}

	console.log("server started");
})