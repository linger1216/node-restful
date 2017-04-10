const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const LessonSchema = new mongoose.Schema({
    name: Number,
    teacher: String
}, {versionKey: false, collection: "lesson"});

module.exports = function (connection) {
    connection.model('LessonSchema', LessonSchema);
}