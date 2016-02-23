var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    db = require('./core/db'),
    routes = require('./core/routes'),
    middleware = require('./core/middleware'),
    bodyParser  = require('body-parser');
    
/** Setup Database
 * sets up the database
 */
db.setup();

/** Configuration
 * configure the server
 */
app.use('/',express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));

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
app.listen(port);
console.log("[server: started on port " + port + "]");

/** Cron Jobs
 * initializing cron jobs
 */
require('./core/cron');