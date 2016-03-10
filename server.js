var express = require('express'),
    app = express(),
    config = require('./config'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    db = require('./core/db'),
    routes = require('./core/routes'),
    middleware = require('./core/middleware'),
    bodyParser = require('body-parser');
    
// setting the required keys for openshift
var PORT = process.env.OPENSHIFT_NODEJS_PORT || config.get('express:port');
var IP = process.env.OPENSHIFT_NODEJS_IP || config.get('express:ip');
var MONGO = process.env.OPENSHIFT_MONGODB_DB_URL + "nodejs" || config.get('mongo:url');
app.set('mongo', MONGO);
app.set('ip', IP);
app.set('port', PORT);

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
console.log("[server started at " + app.get('ip') + " on port " + app.get('port') + "]");

/** Cron Jobs
 * initializing cron jobs
 */
require('./core/cron');