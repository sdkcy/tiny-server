/**
 * tiny-server
 * tinyRouter.js
 * Created by Sıdıka ÇAY on 2019-02-03
 */

function TinyRouter() {
    this._router = {
        "GET": {},
        "POST": {},
        "PUT": {},
        "DELETE": {},
    };
}

TinyRouter.prototype.registerEndpoint = function (method, path, cb) {
    this._router[method][path] = cb;
};

TinyRouter.prototype.getEndpoint = function (method, path) {
    return this._router[method][path];
};

module.exports = TinyRouter;