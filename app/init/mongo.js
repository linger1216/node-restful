/**
 * Created by tuyou on 17/3/5.
 */


const glob = require('glob');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function (app) {

    if (app.config.dbs){
        if (app.config.dbs.test){
            var conn = mongoose.createConnection(app.config.dbs.test);

            conn.on('error', function (error) {
                app.logger.info(app.config.dbs.test + ' failed:'+ error);
            });

            conn.once('open', function() {
                app.logger.info(app.config.dbs.test + ' ok');
            });

            app.logger.debug("----:", app.config.root + 'app/model/*/*.js');

            var models = glob.sync(app.config.root + 'app/model/*/*.js');
            models.forEach(function (model) {
                require(model)(conn);
            });

            app.test_conn = conn;
            app.LessonModel = conn.model('LessonSchema');
        }
        app.mongoose = mongoose;
    }
}
