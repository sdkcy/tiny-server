/**
 * tiny-server
 * index.js
 * Created by Sıdıka ÇAY on 3.12.2018
 */

"use strict";

const Server = require("./server");
let server;

/***
 * This function creates and returns a singleton server object
 * @returns {Server}
 */
function tiny() {
    if (!server) {
        server = new Server();
    }

    return server;
}

module.exports = tiny;