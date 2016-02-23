/** Validation Middleware
* validates the user input to prevent malicious input
*/
var S = require('string'),
	_ = require('lodash'),
    utils = require('../utils');

function validateID(req, res, next, id){
  if (id.match(/^[0-9a-fA-F]{24}$/) == null) {
  		return utils.responseHandler.notFound(req, res);
  }
  next();
}

// export for use elsewhere
module.exports = {
	id: validateID
}
