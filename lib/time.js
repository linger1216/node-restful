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



//
// for(var i=0;i<24;i++){
//     var date = moment().set({'month':i,'date':1}).format('YYYY-MM-DD');
//     console.log(date);
// }



module.exports = obj;

//
//
// function date2timestamp(date){
//     return moment(date).valueOf();
// }
//
// function date2timestamp_deadline(date) {
//     return moment(date).add(1, 'day').valueOf();
// }
//
// function timestamp2date(timestamp){
//     return moment.unix(timestamp/1000).format('YYYY-MM-DD');
// }
//
// function date_detail(date){
//     return moment(date).format('YYYY-MM-DD HH:mm:ss');
// }
//
// function now_date_detail(){
//     return moment().format('YYYY-MM-DD HH:mm:ss');
// }
//
// function timestamp2dete_detail(timestamp){
//     return moment.unix(timestamp/1000).format('YYYY-MM-DD HH:mm:ss');
// }
//
// function get_current_day() {
//     return moment().format('YYYY-MM-DD');
// }
//
// function get_current_day() {
//     return moment().format('YYYY-MM-DD');
// }
//
// function get_add_day(n) {
//     return moment().add(n, 'day').format('YYYY-MM-DD');
// }
//
// function get_sub_day(n) {
//     return moment().subtract(n, 'day').format('YYYY-MM-DD');
// }
//
// function get_tomorrow_day() {
//     return moment().add(1, 'day').format('YYYY-MM-DD');
// }
//
// function get_range_day(start, end) {
//     // log(get_range_day("2016-11-30","2016-12-06"));
//     var i = start;
//     var ret = [];
//     while (i != end){
//         ret.push(i);
//         i = moment(i).add(1, 'day').format('YYYY-MM-DD');
//     }
//     ret.push(end);
//     return ret;
// }
//
// exports.date2timestamp = date2timestamp;
// exports.date2timestamp_deadline = date2timestamp_deadline;
// exports.timestamp2date = timestamp2date;
// exports.timestamp2dete_detail = timestamp2dete_detail;
// exports.get_current_day = get_current_day;
// exports.get_tomorrow_day = get_tomorrow_day;
// exports.get_range_day = get_range_day;
// exports.get_sub_day = get_sub_day;
// exports.date_detail = date_detail;
// exports.now_date_detail = now_date_detail;
// exports.get_add_day = get_add_day;