var _ = require('lodash'),
    ENV = process.env.ENV_VARIABLE || 'development',
    defaultConf = require('./default'),
    customConf = require('./' + ENV);

/** Configuration
* configuration of the specific js file
*/
var conf = {}

function Config() {
    _.extend(conf, defaultConf, customConf);
}

Config.prototype.get = function (path) {
    var current = conf;
    path.split(':').forEach(function (p) { current = current[p]; });
    return current;
}

// exporting for use elsewhere
module.exports = new Config();