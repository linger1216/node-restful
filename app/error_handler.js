/**
 * Created by tuyou on 17/3/5.
 */

module.exports = function (err, req, res, next) {
    this.app.logger.error(err.stack);
    res.status(err.status || 500);
    var ret = {
        msg: err.message || "Internal Server Error",
        code: err.code || -1
    }
    res.json(ret);
    next()
}
