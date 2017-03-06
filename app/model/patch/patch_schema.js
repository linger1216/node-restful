const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var zipSchema = new mongoose.Schema({
    patch_code: Number,
    url: String,
    size:Number,
    md5:String,
    comments:String,
    create_time:Number
});

var packageSchema = new mongoose.Schema({
    id: Number,
    package_name: String,
    patch_code:Number,
    patch_name:String,
    size:Number,
    md5:String,
    comments:String,
    create_time:Number
});

const patchSchema = new mongoose.Schema({
    version_code: Number,
    fire_off_time: Number,
    zip:zipSchema,
    patch:[packageSchema]
}, {versionKey: false, collection: "patch"});


module.exports = function (connection) {
    connection.model('PatchSchema', patchSchema);
}