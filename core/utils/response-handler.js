module.exports.unknownError = function(req, res) {
    var error = {
        "code": 400,
        "id": 1,
        "desc": "an unknown error occured. please try again later"
    }
    res.status(400).json(error);
}

module.exports.notFound = function(req, res) {
    var error = {
        "code": 404,
        "id": 2,
        "desc": "the file couldn't be found"
    }
    res.status(404).json(error);
}

module.exports.urlNotValid = function(req, res) {
    var error = {
        "code": 404,
        "id": 3,
        "desc": "the url given is not a valid soundcloud url"
    }
    res.status(404).json(error);
}

module.exports.responseForSong = function(req, res, song) {
    var response = {
        "uri": "/songs/" + song._id,
        "artist": song.artist,
        "title": song.title
    }
    res.status(200).json(response);
}