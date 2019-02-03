/**
 * tiny-server
 * server.js
 * Created by Sıdıka ÇAY on 3.12.2018
 */

"use strict";

const Server = require("./server");
let tinyServer;

/***
 * This function creates and returns a singleton server object
 * @returns {Server}
 */
function tiny() {
    if (!tinyServer) {
        tinyServer = new Server();
    }

    return tinyServer;
}

module.exports = tiny;