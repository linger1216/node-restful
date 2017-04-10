/**
 * Created by tuyou on 17/4/10.
 */

var schedule = require("node-schedule");

function start_tasks() {
    app.logger.debug('some schedule job...');
}

module.exports = function(app) {
    var j = schedule.scheduleJob('0 * * * * *', function () {
        start_tasks();
    });
}


