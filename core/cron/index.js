var CronJob = require('cron').CronJob,
    db = require('../db'),
    del = require('delete'),
    config = require('../../config');

/** CRONJOB
 * defines a new cronjob which is executed every hour
 */
var job = new CronJob('* */10 * * * *', function() {
    var date = new Date();
    var EXPIRY = 1000 * 60 * 30; /* expiry date: not older than 30 minutes */

    db.song.get({ lastHitAt: { $lt: new Date(date.getTime() - EXPIRY) } }).then(function(entries) {
        for (i in entries) {
            var entry = entries[i];
            var path = config.get('temp:dir') + "songs/" + entry.track_id + ".mp3";
            del.promise([path], { force: true }).then(function() {
                console.log("[cron: mp3 was removed]");
            });
            entry.remove();
        }
    });

    console.log("[cronjob: runned at " + date.toString() + "]");
}, null, true);