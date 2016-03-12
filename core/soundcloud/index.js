var Promise = require('bluebird'),
    request = require('request');

/** Configuration
 * configuration of the baseURL and ClientKey
 */
var baseURL = "https://api.soundcloud.com";
var clientKey = "02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea";

// # creates a new downloader to be exported
var SoundcloudDownloader = {};

// # resolves the soundcloud url
SoundcloudDownloader.resolveURL = function(url, callback) {
    var requestURL = baseURL + "/resolve?url=" + url + "&client_id=" + clientKey;
    request(requestURL, function(err, response, body) {
        if (err) return callback(err, null);

        // return track data
        var data = JSON.parse(body) || {};
        return callback(err, data);
    });
}

// # fetchs the song data by track id
SoundcloudDownloader.fetchSongDataByTrackId = function(id) {
    var streamURL = baseURL + "/tracks/" + id + "/stream?client_id=" + clientKey;
    return request(streamURL);
}

// # fetchs the cover image by url
SoundcloudDownloader.fetchCoverImageByURL = function(url) {
    url = url.replace('large', 't500x500');
    var coverURL = url + "?client_id=" + clientKey;
    return request(coverURL);
}

// exports for use elsewhere
module.exports = SoundcloudDownloader;