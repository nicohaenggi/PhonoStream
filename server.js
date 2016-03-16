var express = require('express'),
    app = express(),
    config = require('./config'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    db = require('./core/db'),
    routes = require('./core/routes'),
    middleware = require('./core/middleware'),
    bodyParser = require('body-parser'),
    mkdir = require('./core/utils').mkdir;

/** FOLDER STRUCTURE
 * creates the permanent cover/songs directory
 */

console.log("[Server running at " + config.get('env') "]");

mkdir.mkdirpSync(config.get('temp:dir') + "cover");
mkdir.mkdirpSync(config.get('temp:dir') + "songs");

/** DATABASE
 * sets up the database
 */
db.setup();

/** CONFIGURATION
 * configure the server
 */

// # serves static files
app.use('/', express.static(__dirname + '/public'));

// # enable morgan dev logger
app.use(morgan('dev'));

// # prepare bodyParser (JSON)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// # validate id input (needs to be a mongodb-ID to be valid)
app.param('id', middleware.validation.id);

/** ROUTES
 * setting up all the routes
 */
app.get('/songs/:id', routes.song.get);
app.get('/resolve', routes.resolve.get);


// # handle request if not successfull yet; must be a 404 Not Found
app.use(function(req, res, next){
    res.sendFile( __dirname + '/public/404.html');
});

/** LISTENING
 * setting up the server and listening
 */
app.listen(config.get('express:port'), config.get('express:ip'));
console.log("[server started at " + config.get('express:ip') + " on port " + config.get('express:port') + "]");

/** CRON JOBS
 * initializing cron jobs
 */
require('./core/cron');