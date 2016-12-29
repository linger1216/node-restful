/**
 * Created by tuyou on 16/12/11.
 */

const log = require('../../lib/log');

module.exports = function (app) {
    var url = '/foo/test';
    log('attached: POST ' + url);
    app.get(url, function (req, res) {
        res.json({"code":0,"msg":"success"})
    });
}