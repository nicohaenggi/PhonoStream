var mongoose = require('mongoose'),
	song = require('./song');

/** Models
* implementing the different database models 
*/
mongoose.model('Song', song.Schema(mongoose));

// export to use elsewhere
module.exports = {
	SongSchema: mongoose.model('Song'),
}

