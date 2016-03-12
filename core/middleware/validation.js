/** Validation Middleware
* validates the user input to prevent malicious input
*/
var _ = require('lodash'),
    utils = require('../utils');

// # validates the user input (needs to be a mongodb-id)
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
