/**
 * tiny-server
 * tinyRequest.js
 * Created by Sıdıka ÇAY on 2019-02-03
 */

"use strict";
const url = require("url");

/***
 * This function adds functionality(url params) to the request.
 * @param req
 * @returns {object}
 */
const tinyRequest = function (req) {
    req.params = url.parse(req.url, true).query;
    return req;
};

module.exports = tinyRequest;