var fs    = require('fs'), 
    path  = require('path');

// creates a directory (not nested)
var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

// export for use elsewhere
// creates a directory based on the dirpath
module.exports.mkdirpSync = function (dirpath) {
  var parts = dirpath.split(path.sep);
  for( var i = 1; i <= parts.length; i++ ) {
    mkdirSync( path.join.apply(null, parts.slice(0, i)) );
  }
}