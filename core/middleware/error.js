var utils = require('../utils');

/** Error Middleware
* resulting in a error
* not calling next as it's the last middleware
*/
function notFound(req, res, next) {
	return res.send("404");
};

// exports for use elsewhere
module.exports = {
	notFound: notFound
};