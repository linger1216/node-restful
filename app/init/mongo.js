/**
 * Created by tuyou on 17/3/5.
 */


const glob = require('glob');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// 不要做耗时操作
module.exports = function (app) {

    var url = "mongodb://" + (app.config.dbs.patch.user ? app.config.dbs.patch.user + ":" : "") + (app.config.dbs.patch.password ? app.config.dbs.patch.password + "@" : "") + app.config.dbs.patch.host + ":" + app.config.dbs.patch.port + "/" + app.config.dbs.patch.database;
    var conn = mongoose.createConnection(url);

    conn.on('error', function (error) {
        app.logger.info(app.config.dbs.patch.desc + 'mongoose failed:'+ error);
    });

    conn.once('open', function() {
        app.logger.info(app.config.dbs.patch.desc + 'mongoose opened!');
    });

    var models = glob.sync(app.config.dbs.patch.models_path);
    models.forEach(function (model) {
        require(model)(conn);
    });
    app.patch_conn = conn;
    app.patch_mongoose = mongoose;
}
