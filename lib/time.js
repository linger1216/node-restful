/**
 * Created by tuyou on 16/11/11.
 */


var moment = require('moment');

var obj = {
    get_time: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    get_current_time: function () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    get_current_day: function () {
        return moment().format('YYYY-MM-DD');
    },
    get_current_month:function () {
        return moment().get('month');
    }
}
module.exports = obj;