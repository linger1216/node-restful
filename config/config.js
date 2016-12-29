const path = require('path');

const config = {
    root: path.resolve(__dirname, '../'),
    environment: process.env.NODE_ENV || 'dev',
    server: {
        desc: 'foo server',
        host: 'localhost',
        port: process.env.PORT || 8000
    },
    dbs: {
        foo_db:{
            models_path: path.resolve(__dirname, '../') + '/model/foo/*.js',
            url: process.env.MONGO_DB_URI || 'mongodb://localhost/foo'
        }
    },
    valid_paras: true
};

module.exports = config;