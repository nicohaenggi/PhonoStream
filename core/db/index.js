var mongoose = require('mongoose'),
    config = require('../../config'),
	options = { server : { auto_reconnect: true, poolSize: 10 } },
	Promise = require('bluebird'),
    song = require('./song');

// export for use elsewhere
module.exports = {
	song: song
}

module.exports.setup = function() {
	mongoose.connection.open(config.get('mongo:url'), options, function(err){
        if (err) return console.log("[failed opening connection to db with error: " + err + "]");
        console.log("[opened db connection on " + config.get('mongo:url') + "]");
    });
}