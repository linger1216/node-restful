const path = require('path');

const config = {
    root: path.resolve(__dirname, '../../') + "/",
    server: {
        desc: 'server desc',
        host: 'localhost',
        port: process.env.PORT || 15000
    },
    dbs: {
        patch:{
            desc: 'patch db',
            models_path: path.resolve(__dirname, '../../app/model/patch/*.js'),
            host: process.env.MONGO_HOST || '127.0.0.1',
            port: process.env.MONGO_PORT || 27017,
            user: 'test',
            password: 'test',
            database: 'test'
        }
    },
    log:{
        file:{
            path: path.resolve(__dirname, '../../log.txt'),
            level: 'DEBUG'
        },
        console:{
            level: 'DEBUG'
        }
    }
};

module.exports = config;