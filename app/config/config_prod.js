const path = require('path');

const config = {
    root: path.resolve(__dirname, '../../') + "/",
    server: {
        desc: 'patch server',
        host: 'localhost',
        port: process.env.PORT || 15000
    },
    dbs: {
        patch:{
            desc: 'patch db',
            models_path: path.resolve(__dirname, '../../app/model/patch/*.js'),
            host: process.env.MONGO_HOST || '116.62.25.250',
            port: process.env.MONGO_PORT || 27017,
            user: 'test',
            password: '123456',
            database: 'hawkeye'
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