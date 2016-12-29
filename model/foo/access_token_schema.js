
const mongoose = require('mongoose');

const AccessTokenSchema = new mongoose.Schema({
    access_token:String,
    appID:String,
    time:Number
},{versionKey:false,collection: "access_token"});

module.exports = function (connection) {
    connection.model('AccessTokenSchema', AccessTokenSchema);
}