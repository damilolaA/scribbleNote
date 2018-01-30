var path = require('path');

module.exports =  {
	entry: "./www/js/app.js",
	output: {
		path: path.resolve("www"),
		filename: 'bundle.js'
	}
}
	
