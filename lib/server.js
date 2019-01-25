/**
 * tiny-server
 * server.js
 * Created by Sıdıka ÇAY on 3.12.2018
 */

const http = require('http');
const fs = require("fs");
const path = require('path');
const url = require('url');
const router = new Router();
var httpServer;

module.exports = function tiny() {
    httpServer = http.createServer((req, res) => {
        const routePath = url.parse(req.url).pathname;
        const method = req.method;
        const cb = router.getEndpoint(method, routePath);
        if (!cb) {
            res.writeHead(404, {"Content-Type": "text/html"});
            return fs.readFile(path.join(__dirname, "error_pages/404.html"), (error, data) => {
                if (error) {
                    console.error(error);
                }
                res.write(data);
                return res.end();
            });
        } else {
            res = tinyResponse(res);
            cb(req, res);
        }
    });

    return Server;
};

const tinyResponse = function (res) {
    const response = {
        status: function (statusCode) {
            res.writeHead(statusCode);
            return response;
        },
        send: function (body) {
            res.write(body);
            res.end();
            return response;
        },
        setHeader: function (name, value) {
            res.setHeader(name, value);
            return response;
        },
        setHeaders: function (headers) {
            for (var key in headers) {
                res.setHeader(key, headers[key]);
            }
            return response;
        }
    };

    return response;
};


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

const Server = {
    listen: function (port, cb) {
        httpServer.listen(port);
        cb();
    },
    get: function (path, cb) {
        router.registerEndpoint("GET", path, cb);
    },
    post: function (path, cb) {
        router.registerEndpoint("POST", path, cb);
    },
    put: function (path, cb) {
        router.registerEndpoint("PUT", path, cb);
    },
    delete: function (path, cb) {
        router.registerEndpoint("DELETE", path, cb);
    }
};