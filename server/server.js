var express = require("express"),
	app		= express(),
	api		= require("../api/api.js"),
	bps		= require("body-parser"),
	cors	= require("cors"),
	morgan	= require("morgan");

app.use(bps.json())
app.use(bps.urlencoded({extended: true}))

app.use(cors())

app.use(morgan("dev"))

app.use(function(err, req, res, next) {
	res.status(500).json(err.message)
	next()
})

module.exports = app;
