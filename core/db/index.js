var mongoose = require('mongoose'),
    config = require('../../config'),
	options = { server : { auto_reconnect: true, poolSize: 10 } },
	Promise = require('bluebird'),
    song = require('./song');

// export for use elsewhere
module.exports = {
	song: song
}

module.exports.setup = function(app) {
    console.log("[trying to open database connection on " + app.get('mongo') + " ...]");
	mongoose.connection.open(app.get('mongo'), options, function(){
        console.log("[opened database connection on " + app.get('mongo') + " ...]");
    });
}