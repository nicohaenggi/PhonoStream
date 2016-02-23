var Promise = require('bluebird'), 
    tmp = require('tmp'),
    fs = require('fs');

module.exports = function (type, callback) {

    return tmp.file({ prefix: type + '-', postfix: '.' + type }, function _tempFileCreated(err, path, fd, cleanupCallback) {
        if (err) return callback(err, null);
        
        return callback(null, path);
        
    });
}