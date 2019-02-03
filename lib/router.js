/**
 * tiny-server
 * router.js
 * Created by Sıdıka ÇAY on 2019-02-03
 */

function Router() {
    this._router = {
        "GET": {},
        "POST": {},
        "PUT": {},
        "DELETE": {},
    };
}

Router.prototype.registerEndpoint = function (method, path, cb) {
    this._router[method][path] = cb;
};

Router.prototype.getEndpoint = function (method, path) {
    return this._router[method][path];
};

module.exports = Router;