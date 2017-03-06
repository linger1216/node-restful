/**
 * Created by tuyou on 17/3/5.
 */

const Parameter = require('parameter');
module.exports = function (app) {
    var validator = new Parameter();
    function validate(rules, data) {
        const errors = validator.validate(rules, data);
        if (errors) {
            var err = Error('Validation Failed');
            err.code = -2;
            err.message = errors
            throw err;
        }
    }
    app.validate = validate
}

