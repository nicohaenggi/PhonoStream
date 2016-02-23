var nodeID3 = require('node-id3'),
    Promise = require('bluebird');

module.exports = function(jsonData, mp3Path, coverPath) {
    
    // set up the required tags    
    var tags = {
        title: jsonData.title,
        artist: jsonData.user.username,
        album: jsonData.album,
        composer: jsonData.user.username,
        image: coverPath
    };
    
    // write the mp3
    var success = nodeID3.write(tags, mp3Path);
   if(!success) Promise.reject();
    return Promise.resolve(mp3Path);
}
