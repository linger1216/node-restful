/**
 * Created by tuyou on 16/12/13.
 */
const Rx = require('rx');
var https = require('https');
var qs = require('querystring');

var request = {
    get: function (url, paras, callback) {
        var _url = url + (paras ? '?' + qs.stringify(paras) : "");
        var req = https.get(_url, function (res) {
            res.setEncoding('utf8');
            var body = "";
            res.on('data', function (chunk) {
                body += chunk;
            })
            res.on('end', function () {
                var ret = JSON.parse(body);
                callback(null, body);
            })
        }).on('error', function (e) {
            callback(e);
        });
        req.end();
    },
    rx_get: function (url, paras) {
        return Rx.Observable.create(function (observe) {
            request.get(url, paras, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    rx_post: function (host, port, path, queryParas, datas) {
        return Rx.Observable.create(function (observe) {
            request._post(host, port, path, queryParas, datas, 'application/x-www-form-urlencoded', function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    rx_post_raw: function (host, port, path, queryParas, raw) {
        return Rx.Observable.create(function (observe) {
            request._post(host, port, path, queryParas, raw, 'application/json', function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    _post: function (host, port, path, queryParas, datas, contentType, callback) {
        var path = path + (queryParas ? '?' + qs.stringify(queryParas) : "");
        var content = null;
        if (contentType === 'application/json') {
            content = JSON.stringify(datas);
        } else if (contentType === 'application/x-www-form-urlencoded') {
            content = qs.stringify(datas);
        }
        var opt = {
            hostname: host,
            port: port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': contentType,
                'Content-Length': Buffer.byteLength(content)
            }
        };

        console.log("[POST] " + host + path);
        console.log("raw:" + content);

        var req = https.request(opt, function (res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            })
            res.on('end', function () {
                callback(null, body);
            })
        });
        req.on('error', function (err) {
            callback(err);
        });
        req.write(content);
        req.end();
    }

}

module.exports = request;



