var _ = require("lodash");

var config = {

	dev: 'development',
	test: 'testing',
	prod: 'production'
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV

var envconfig = require('./' + config.env);

var data = _.merge(config, envconfig);

module.exports = data;