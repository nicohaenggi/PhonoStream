var express = require('express'),
    app = express(),
    config = require('./config'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    db = require('./core/db'),
    routes = require('./core/routes'),
    middleware = require('./core/middleware'),
    bodyParser = require('body-parser');

console.log(config.get('env'));
      
// # set port
var PORT = process.env.OPENSHIFT_NODEJS_PORT || config.get('express:port');
var IP = process.env.OPENSHIFT_NODEJS_IP || config.get('express:ip');
var MONGO = config.get('mongo:url');
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    MONGO = process.env.OPENSHIFT_MONGODB_DB_URL + "phonostream";
}
app.set('port', PORT);
app.set('ip', IP);
app.set('mongo', MONGO);

/** Setup Database
 * sets up the database
 */
db.setup(app);

/** Configuration
 * configure the server
 */
app.use('/', express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));

// # prepare bodyParser (JSON)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



console.log(config.get('mongo:url'));

// # validate input
app.param('id', middleware.validation.id);

/** Routes
 * setting up all the routes
 */
app.get('/songs/:id', routes.song.get);
app.get('/resolve', routes.resolve.get);


// # handle request if not successfull yet; must be a 404 Not Found
app.use(middleware.error.notFound);


/** Listening
 * setting up the server and listening
 */
app.listen(app.get('port'), app.get('ip'));
console.log("[server: started on port " + app.get('port') + "]");

/** Cron Jobs
 * initializing cron jobs
 */
require('./core/cron');