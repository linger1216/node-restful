/**
 * Created by tuyou on 16/12/13.
 */

const moment = require('moment');
const crypto = require('crypto');

var utils = {
    isNumber:function (number) {
        var n = parseInt(number);
        return n < 9007199254740991 && !isNaN(n);
    },
    isString:function (str) {
        return typeof str === "string";
    },
    isDate:function (str) {
        try {
            var val = moment(str);
            return true;
        }
        catch (e){
            return false;
        }
    },
    md5:function(str, algorithm, encoding) {
        return crypto.createHash(algorithm || 'md5').update(str).digest(encoding || 'hex');
    },

    random_string: function(len, radix) {
        radix = radix ? 10 : 36;
        var rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(radix).substr(2));
        return rdmString.substr(0, len);
    }

}

module.exports = utils;