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

// setting the required keys for openshift
nconf.set('express:port',process.env.OPENSHIFT_NODEJS_PORT || nconf.get('express:port'));
nconf.set('express:ip',process.env.OPENSHIFT_NODEJS_IP || nconf.get('express:ip'));
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    nconf.set('mongo:url', process.env.OPENSHIFT_MONGODB_DB_URL + "phonostream");
}

// exporting for use elsewhere
module.exports = new Config();