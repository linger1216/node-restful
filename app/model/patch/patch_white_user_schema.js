const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const patchWhiteUsersSchema = new mongoose.Schema({
    version_code: Number,
    deviceid: String,
    imei: String
}, {versionKey: false, collection: "patch_white_users"});

module.exports = function (connection) {
    connection.model('PatchWhiteUsersSchema', patchWhiteUsersSchema);
}