/**
 * tiny-server
 * server.js
 * Created by Sıdıka ÇAY on 2019-02-03
 */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const httpStatusCode = require("../constants/index");
const tinyRequest = require("./tinyRequest");
const tinyResponse = require("./tinyResponse");
const Router = require("./router");

function Server() {
    this._router = new Router();
    this._httpServer = http.createServer((req, res) => {
        const routePath = url.parse(req.url).pathname;
        const method = req.method;
        const cb = this._router.getEndpoint(method, routePath);
        if (!cb) {
            res.writeHead(httpStatusCode.NOT_FOUND, {"Content-Type": "text/html"});
            return fs.readFile(path.join(__dirname, "../error_pages/404.html"), (error, data) => {
                if (error) {
                    console.error(error);
                }
                res.write(data);
                return res.end();
            });
        } else {
            res = tinyResponse(res);
            req = tinyRequest(req);
            cb(req, res);
        }
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

module.exports = Server;