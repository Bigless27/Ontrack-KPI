var _  = require('lodash');

var config = {
	dev: 'development',
	test: 'testing',
	prod: 'production',
	port: process.env.PORT || 3000,
	// 10 days in minutes
	expireTime: 24 * 60 * 10,
	secrets: {
		jwt: process.env.JWT || 'Charzard'
	}
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;
// require could error out if
// the file doesn't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
	envConfig = require('./' + config.env);
	// just making sure the require actually
	// got something back;

	envConfig = envConfig || {};
} catch(err) {
	if (err) console.log(err)
	envConfig = {};
}

// merge the two config files together
// the envConfig file will overwirte properties
// on the config object
module.exports = _.merge(config, envConfig);