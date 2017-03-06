/**
 * Created by tuyou on 17/3/6.
 */

var logrotate = require('../../lib/log_ratator');

module.exports = function (app) {

    // use the global rotator
    var rotator = logrotate.rotator;

    // check file rotation every 5 minutes, and rotate the file if its size exceeds 10 mb.
    // keep only 3 rotated files and compress (gzip) them.
    rotator.register(app.config.root + 'log.txt', {schedule: '1m', size: '10k', compress: true, count: 3});

    rotator.on('error', function(err) {
        app.logger.info('oops, log rotate an error occured!');
    });

    // 'rotate' event is invoked whenever a registered file gets rotated
    rotator.on('rotate', function(file) {
        app.logger.info('file ' + file + ' was rotated!');
    });
}

