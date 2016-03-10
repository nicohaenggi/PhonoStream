var nconf = require('nconf'),
    fs = require('fs');

/** Configuration
* nconf.env('_'): specify a separator for nested keys (instead of the default ':')
*/
function Config() {
    nconf.argv();
    nconf.env('_');
    var environment = nconf.get('NODE:ENV')  || 'development';
    nconf.file(environment, 'config/' + environment + '.json');
    nconf.file('default', 'config/default.js');
}

/** Accessing Values
* Defining Getter-Method
*/
Config.prototype.get = function (key) {
    return nconf.get(key);
}

// console.log(PORT + " , " + IP + " , " + process.env.OPENSHIFT_MONGODB_DB_URL);

// save new config to file
nconf.save(function (err) {
    var environment = nconf.get('NODE:ENV')  || 'development';
    fs.readFile('config/' + environment + '.json', function (err, data) {
        console.log(JSON.parse(data.toString()));
    });
});

// exporting for use elsewhere
module.exports = new Config();