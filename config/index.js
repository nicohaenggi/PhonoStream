var nconf = require('nconf');

/** Configuration
* nconf.env('_'): specify a separator for nested keys (instead of the default ':')
*/
function Config() {
	nconf.argv();
	nconf.env('_');
	var environment = nconf.get('NODE:ENV') || 'development';
	nconf.file(environment, 'config/' + environment + '.json');
	nconf.file('default', 'config/default.js');
}

/** Accessing Values
* Defining Getter-Method
*/
Config.prototype.get = function(key) {
	return nconf.get(key);
}

// exporting for use elsewhere
module.exports = new Config();