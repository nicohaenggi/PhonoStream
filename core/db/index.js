var mongoose = require('mongoose'),
    config = require('../../config'),
    connectionString = config.get('mongo:url'),
	options = { server : { auto_reconnect: true, poolSize: 10 } },
	Promise = require('bluebird'),
    song = require('./song');

// export for use elsewhere
module.exports = {
	song: song
}

module.exports.setup = function() {
	mongoose.connection.open(connectionString, options);
}