/**
 * Created by tuyou on 17/3/4.
 */

function _route(app, method, url, filePath) {
    if(method.toLowerCase() === "get"){
        app.get(url, require(app.config.root + filePath))
    } else if(method.toLowerCase() === "post"){
        app.post(url, require(app.config.root + filePath))
    }
    app.logger.info("attached router:" + url + " --> " + filePath);
}


module.exports = function (app) {
    this.app = app
    const method = { GET:"GET", POST:"POST" }
    _route(app, method.POST, '/api/v1/test', 'app/controller/test/test.js');
};
