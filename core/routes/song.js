var db = require('../db'),
    Promise = require('bluebird'),
    utils = require('../utils'),
    del = require('delete');

/** Song API Routes
* implements the Song API Routes
*/

module.exports.get = function (req, res) {
    // :id already validated
    // fetch data from database
    db.song.getById(req.params.id).then(function (song) {
        if (song == null) return utils.responseHandler.notFound(req, res); // no object found; send Bad Request
        var TEMP = process.env.OPENSHIFT_DATA_DIR || './tmp/';
        var fileLoc = "songs/" + song.track_id + ".mp3";
        var fileName = song.songTitle + ".mp3";
        res.download(fileLoc, fileName, function () {
            // remove files and entries (DMCA)
            del.promise([fileLoc],{force: true})
                .then(function () {
                    console.log("[cleanup: song mp3 were removed]");
                });
            song.remove();
        });

    }).catch(function (err) {
        return utils.responseHandler.unknownError(req, res); // internal error
    });
}
