var rx_mongo = require(app.config.root + "/lib/rx_mondo.js");

module.exports = function (req, res) {
    rx_mongo.rx_find(app.LessonModel, {}, null, null).subscribe(
        function (x) {
            res.api_success(x);
        },
        function (err) {
            app.logger.error(err);
            res.api_error(500, err);
        },
        function () {
        })
};


