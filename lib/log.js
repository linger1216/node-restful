/**
 * Created by tuyou on 16/12/14.
 */

/**
 * Created by tuyou on 16/11/8.
 */

var log4js = require('log4js');
var logger = log4js.getLogger();
// var log4js_config = require('./log_config.json');
// log4js.configure(log4js_config);
// var logger = log4js.getLogger('log_date');

function log(msg) {
    logger.debug(msg);
}

module.exports = log;
