/**
 * tiny-server
 * tinyResponse.js
 * Created by Sıdıka ÇAY on 2019-02-03
 */

"use strict";

/***
 * This function adds some functionality(status, send, setHeader, setHeaders) to the response.
 * @param res
 * @returns {object}
 */
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
            for (let key in headers) {
                res.setHeader(key, headers[key]);
            }
            return response;
        }
    };

    return response;
};

module.exports = tinyResponse;