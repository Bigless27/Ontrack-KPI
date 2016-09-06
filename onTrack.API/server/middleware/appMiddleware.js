var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var override = require("method-override");
var flash = require('connect-flash');

module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: true}));
	app.use(bodyParser.json());
	app.use(cors());
	app.use(override());
	app.use(flash());
}