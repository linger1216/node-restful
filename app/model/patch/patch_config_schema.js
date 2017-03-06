const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const patchConfigSchema = new mongoose.Schema({
    version_code: Number,
    mode: String
}, {versionKey: false, collection: "patch_config"});

module.exports = function (connection) {
    connection.model('PatchConfigSchema', patchConfigSchema);
}