var db = require('../db'),
    utils = require('../utils'),
    config = require('../../config'),
    del = require('delete'),
    mongoose = require('mongoose');

/** Song API Routes
* implements the Song API Routes
*/

module.exports.get = function(req, res) {
    // :id already validated
    // fetch data from database
    db.song.getById(req.params.id).then(function(song) {
        if (song == null) return utils.responseHandler.notFound(req, res); // no object found; not found response
        var fileLoc = config.get('temp:dir') + "songs/" + song.track_id + ".mp3";
        var fileName = song.mp3Title + ".mp3";
        res.download(fileLoc, fileName, function() {
            // update lastHitAt; generate new ObjectID (in order to prevent downloading from the same link)
            var newSong = song.toObject();
            delete newSong._id;
            song.lastHitAt = Date.now();
            db.song.create(newSong).then(function(song) {
                console.log("[mongoose: updated object]");
            });
            song.remove();
        });

    }).catch(function(err) {
        return utils.responseHandler.unknownError(req, res); // internal error occured
    });
}
