var CronJob = require('cron').CronJob,
    db = require('../db');

var job = new CronJob('0 0 * * * *', function() {
    var date = new Date();
    var EXPIRY = 1000*60*40;
    
    db.song.removeWithQuery({lastHitAt: {$lt: new Date(date.getTime() + EXPIRY)}});
    console.log("[cronjob: runned at " + date.toString() + "]");
  },null, true);