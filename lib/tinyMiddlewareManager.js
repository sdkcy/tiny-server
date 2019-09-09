/**
 * tiny-server
 * tinyMiddleware.js
 * Created by Sıdıka ÇAY on 8.09.2019
 */

"use strict";

function TinyMiddlewareManager() {
    this._middlewares = [];
    this._counter = 0;
}

TinyMiddlewareManager.prototype.registerMiddleware = function (middleware) {
    this._middlewares.push(middleware);
};

TinyMiddlewareManager.prototype.runMiddlewares = function (req, res, cb) {
    const next = () => {
        this._counter++;
        if (this._counter < this._middlewares.length) {
            this._middlewares[this._counter](req, res, next);
        } else {
            cb();
        }
    };

    this._middlewares.length > 0 ? this._middlewares[0](req, res, next) : cb();
};

module.exports = TinyMiddlewareManager;