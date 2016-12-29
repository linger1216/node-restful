const Rx       = require('rx');
const fs       = require('fs');
const path       = require('path');
const glob       = require('glob');
const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const util = require('./lib/utils');
const config = require('./config/config');
const log = require('./lib/log');

// -------------------------------------------------------- valid api
var apiMapping = JSON.parse(fs.readFileSync(config.root + '/config/valid_paras.json'));
for (var i in apiMapping){
    var api = apiMapping[i];
    for(var j =0; api.params && j<api.params.length;j++) {
        api.params[j].method = api.method.toLowerCase();
    }
}

// -------------------------------------------------------- mongodb connect and load models
var models = glob.sync(config.root + '/model/*.js');
models.forEach(function (model) {
    require(model);
});


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
app.use(result_wrapped);

if(config.valid_paras){
    app.use(valid_paras);
}

// ---------------------------------------------------------- logs
app.use(morgan('dev'))

// ---------------------------------------------------------- route apis
var apis = glob.sync(config.root + '/api/*/*.js');
apis.forEach(function (f) {
    require(f)(app);
});


app.listen(config.server.port, function () {
    log(config.server.desc +" started on port:" + config.server.port);
});


// -------------------------------------------- functions
function result_wrapped(req, res, next) {
    res.api_success = function (data) {
        var ret = {res: data, msg: "success", code: 0};
        res.json(ret)
    };
    res.api_error = function (code, message) {
        var ret = {
            msg: message,
            code: code
        }
        log(ret);
        res.json(ret);
    };
    next();
}

function get_para(req, method, name) {
    if (method == "get") {
        return req.query[name];
    } else if (method == "post") {
        return req.body[name];
    }
}

function valid_paras(req, res, next) {
    Rx.Observable.just(req.path)
        .flatMap(function (path) {
            return apiMapping[path] ? Rx.Observable.just(apiMapping[path]) : Rx.Observable.throw({
                    code:-1,
                    msg:'invalid path'
                });
        })
        .flatMap(function (properties) {
            return properties.params? Rx.Observable.from(properties.params):Rx.Observable.throw({
                    code:0,
                    msg:'no need para'
                });
        })
        .flatMap(function (para) {
            var val = get_para(req,para.method,para.name);
            if(val){
                var valid = true;
                if (para.type.toLowerCase() == "string"){
                    valid = util.isString(val);
                } else if (para.type.toLowerCase() == "int"){
                    valid = util.isNumber(val);
                } else if (para.type.toLowerCase() == "date"){
                    valid = util.isDate(val);
                }
                if(!valid){
                    return Rx.Observable.throw({
                        code:-2,
                        msg:'invalid para ' + para.name + ' expected type ' + para.type.toLowerCase()
                    });
                }
            } else {
                if(typeof para.required === 'undefined' ? true: para.required) {
                    return Rx.Observable.throw({
                        code:-2,
                        msg:'need para ' + para.name
                    })
                }
            }
            return Rx.Observable.just(para);
        })
        .subscribe(
            function (res) {
            },
            function (e) {
                if(e.code >= 0){
                    next();
                } else{
                    res.api_error(e.code, e.msg);
                }
            },
            function () {
                next();
            }
        );
}