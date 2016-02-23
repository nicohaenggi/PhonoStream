var mongoose = require('mongoose'),
//	connectionString = "mongodb://localhost/leopard",
    connectionString = "mongodb://admib:lpic11lpic11@ds015398.mongolab.com:15398/heroku_qsg214kh",
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