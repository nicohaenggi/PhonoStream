var nodeID3 = require('node-id3'),
    Promise = require('bluebird');

module.exports = function(jsonData, mp3Path, coverPath) {

    // creating the ID3-Tags for the Song-File  
    var tags = {
        title: jsonData.title,
        artist: jsonData.user.username,
        album: jsonData.album || jsonData.title,
        composer: jsonData.user.username,
        image: coverPath
    };

    // Write the ID3-Tags to the MP3
    var success = nodeID3.write(tags, mp3Path);
    if (!success) {
        console.log("[couldn't write the id3-tags to the mp3]");
        return Promise.reject();
    }
    console.log("[successfully wrote the id3-tags to the mp3]");
    return Promise.resolve(mp3Path);
}
