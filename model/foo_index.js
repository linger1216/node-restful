
const glob = require('glob');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require("../config/config");
const log = require('../lib/log');

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        log('wechat Mongoose disconnected on app termination');
        process.exit(0);
    });
});

var wechatConnection = mongoose.createConnection(config.dbs.foo_db.url);

var models = glob.sync(config.dbs.foo_db.models_path);
models.forEach(function (model) {
    require(model)(wechatConnection);
});


exports.connection = wechatConnection;
exports.mongoose = mongoose;
