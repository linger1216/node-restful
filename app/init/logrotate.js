/**
 * Created by tuyou on 17/3/6.
 */

var logrotate = require('../../lib/log_ratator');

module.exports = function (app) {

    var rotator = logrotate.rotator;
    rotator.register(app.config.root + 'log.txt', { schedule: app.config.log.rotate.schedule,
        size: app.config.log.rotate.size,
        compress: true,
        count: app.config.log.rotate.count });

    rotator.on('error', function(err) {
        app.logger.info('oops, log rotate an error occured!');
    });

    // 'rotate' event is invoked whenever a registered file gets rotated
    rotator.on('rotate', function(file) {
        app.logger.info('file ' + file + ' was rotated!');
    });
}

