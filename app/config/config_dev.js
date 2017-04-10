const path = require('path');

const config = {
    root: path.resolve(__dirname, '../../') + "/",
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 15000
    },
    dbs: {
        test:process.env.TEST_DB_URI || 'mongodb://test:123456@116.62.25.250:27017/test',
    },
    log:{
        file:{
            path: path.resolve(__dirname, '../../log.txt'),
            level: 'DEBUG'
        },
        console:{
            level: 'DEBUG'
        },
        rotate:{
            schedule:'1h',
            size:'10m',
            count:168
        }
    }
};

module.exports = config;