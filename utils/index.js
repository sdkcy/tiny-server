/**
 * tiny-server
 * index.js
 * Created by Sıdıka ÇAY on 8.09.2019
 */

"use strict";

const httpStatusCode = require("../constants/index");
const fs = require("fs");
const path = require("path");

function showNotFoundPage(res) {
    res.writeHead(httpStatusCode.NOT_FOUND, {"Content-Type": "text/html"});

    return fs.readFile(path.join(__dirname, "../error_pages/404.html"), (error, data) => {
        if (error) {
            console.error(error);
        }
        res.write(data);
        return res.end();
    });
}

module.exports = showNotFoundPage;