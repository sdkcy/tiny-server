/**
 * tiny-server
 * server.js
 * Created by Sıdıka ÇAY on 2019-02-03
 */
"use strict";

const http = require("http");
const url = require("url");

const tinyRequest = require("./tinyRequest");
const tinyResponse = require("./tinyResponse");
const Router = require("./tinyRouter");
const MiddlewareManager = require("./tinyMiddlewareManager");
const showNotFoundPage = require("../utils");

function Server() {
    this._router = new Router();
    this._middlewareManager = new MiddlewareManager();

    this._httpServer = http.createServer((req, res) => {
        const routePath = url.parse(req.url).pathname;
        const method = req.method;
        const cb = this._router.getEndpoint(method, routePath);

        this._middlewareManager.runMiddlewares(req, res, () => {
            if (!cb) {
                showNotFoundPage(res);
            } else {
                res = tinyResponse(res);
                req = tinyRequest(req);
                cb(req, res);
            }
        });
    });
}

Server.prototype.listen = function (port, cb) {
    this._httpServer.listen(port);
    if (cb) {
        cb();
    }
};

Server.prototype.close = function (cb) {
    this._httpServer.close();
    if (cb) {
        cb();
    }

    this._router = new Router();
};


Server.prototype.get = function (path, cb) {
    this._router.registerEndpoint("GET", path, cb);
};

Server.prototype.post = function (path, cb) {
    this._router.registerEndpoint("POST", path, cb);
};

Server.prototype.put = function (path, cb) {
    this._router.registerEndpoint("PUT", path, cb);
};

Server.prototype.delete = function (path, cb) {
    this._router.registerEndpoint("DELETE", path, cb);
};

Server.prototype.use = function (cb) {
    this._middlewareManager.registerMiddleware(cb);
};

module.exports = Server;