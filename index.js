const glob       = require('glob');
const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');

// ----------------------------------------------------- load express app
const app = express();
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))


// ----------------------------------------------------- load config
// NODE_ENV=production
if (process.env.NODE_ENV === 'dev'){
    app.config = require('./app/config/config_dev');
} else if (process.env.NODE_ENV === 'prod'){
    app.config = require('./app/config/config_prod');
}

// ----------------------------------------------------- load logger
const Logger = require('egg-logger').Logger;
const FileTransport = require('egg-logger').FileTransport;
const ConsoleTransport = require('egg-logger').ConsoleTransport;
const logger = new Logger();

if(app.config.log.file){
    logger.set('file', new FileTransport({
        file: app.config.log.file.path,
        level: app.config.log.file.level,
        formatter: loggerFormatter
    }));
}

if(app.config.log.console){
    logger.set('console', new ConsoleTransport({
        level: app.config.log.console.level,
        formatter: loggerFormatter
    }));
}

app.logger = logger;

// ----------------------------------------------------- global init
var init_list = glob.sync(app.config.root + 'app/init/*.js');
init_list.forEach(function (f) {
    app.logger.info('attached init:' + f)
    var init_func = require(f)
    if (typeof init_func === 'function'){
        init_func(app);
    }
});


// ----------------------------------------------------- load middleware (first)
var middle_list = glob.sync(app.config.root + 'app/middleware/*.js');
middle_list.forEach(function (f) {
    app.logger.info('attached middleware:' + f)
    var middle_func = require(f)
    if (typeof middle_func === 'function'){
        app.use(middle_func);
    }
});



// ----------------------------------------------------- global last
var last_list = glob.sync(app.config.root + 'app/last/*.js');
last_list.forEach(function(f) {
    app.logger.info('attached last:' + f)
    var last_func = require(f)
    if (typeof last_func === 'function') {
        last_func(app);
    }
});


// ----------------------------------------------------- load router (second)
require(app.config.root + "app/router")(app);

// ----------------------------------------------------- load error handler (last)
// 加载路由完成后才能加载错误处理中间件
app.use(require(app.config.root + 'app/error_handler.js'));


// ----------------------------------------------------- start server
app.listen(app.config.server.port, function () {
    logger.info("server started on port:" + app.config.server.port);
});


function loggerFormatter(meta) {
    return meta.date + ' ' + meta.level + ' ' + meta.pid + ' ' + meta.message;
}