var request = require('request'),
    fs = require('fs'),
    Promise = require('bluebird'),
    utils = require('../utils'),
    db = require('../db'),
    soundcloud = require('../soundcloud'),
    del = require('delete');

module.exports.get = function (req, res) {
    var url = req.query.url;
    var type = urlType(url);
    var mp3Saved = false;
    var imgSaved = false;

    if (type === "error") return utils.responseHandler.urlNotValid(req, res); // url validation failed
    
    // individual song
    soundcloud.resolveURL(url, function (err, track){
        if (err) return utils.responseHandler.unknownError(req, res);
        
        if (track == null || track.id == null) return utils.responseHandler.urlNotValid(req, res); // return promise instead later
        
        // database lookup
        return db.song.getOne({ track_id: track.id }).then(function (entry) {
            if (entry) {
                entry.lastHitAt = Date.now();
                entry.save(function (err) {
                    if (err) return console.log("[mongoose: couldn't update lastHitAt]");
                });
                return utils.responseHandler.responseForSongId(req, res, entry._id); // found cached entry
            } 
        
            // ## no cached result; create file
            
            // fetch sstream
            var path = "tmp/songs/" + track.id + ".mp3";
            var stream = soundcloud.fetchSongDataByTrackId(track.id).pipe(fs.createWriteStream(path));
            stream.on('finish', function () {
                mp3Saved = true;
                track.sc_path = path;
                finishedWriting(track);
            });
            
            // fetch cover image
            var imgUrl = track.artwork_url || track.user.avatar_url;
            if (!imgUrl) {
                imgSaved = true;
                finishedWriting(track);
            }
            var coverPath = "tmp/cover/" + track.id + ".jpg";
            var coverStream = soundcloud.fetchCoverImageByURL(imgUrl).pipe(fs.createWriteStream(coverPath));
            coverStream.on('finish', function(){
                imgSaved = true;
                track.sc_cover = coverPath;
                finishedWriting(track);
            });
            
        });
        
    });


    function finishedWriting(data) {
        if (mp3Saved !== true || imgSaved !== true) return;
        // writing finished; modify id3
        utils.mp3Writer(data, data.sc_path, data.sc_cover).then(function (path) {
            // save to database
            createEntry(data).then(function (song){
                return utils.responseHandler.responseForSongId(req, res, song._id); // found song
            }).catch(function (err){
                return utils.responseHandler.unknownError(req, res);
            });
            
            // do cleanup
            if (data.sc_cover) return doCleanUp(data.sc_cover);
        }).catch(function (err) {
            return utils.responseHandler.unknownError(req, res);
        });
    }

}

function createEntry(data) {
    // create entry
    var entry = {
        track_id: data.id,
        createdAt: Date.now(),
        lastHitAt: Date.now(),
        songTitle: data.user.username + " - " + data.title,

    }
    
    // save entry
    return db.song.create(entry).then(function (song) {
        return Promise.resolve(song);
    }).catch(function (err) {
        return Promise.reject(err);
    });

}

function doCleanUp(path) {
    del.promise([path])
        .then(function () {
            console.log("[cleanup: cover imgs were removed]");
        });
}

function urlType(url) {
    if (url.indexOf('soundcloud.com/') == -1) return "error";
    if (url.indexOf('www.') == -1 && url.indexOf('http') == -1) return "error";
    
    // domain validated; what kind of domain is it?
    return "song";
}