/**
 * Created by tuyou on 17/3/5.
 */


module.exports = function (req, res, next) {
    res.api_success = function (data) {
        var ret = {res: data, msg: "success", code: 0};
        res.json(ret)
    };
    res.api_error = function (code, message) {
        var ret = {
            msg: message,
            code: code
        }
        res.json(ret);
    };
    next();
}
