/**
 * tiny-server
 * index.js
 * Created by Sıdıka ÇAY on 3.12.2018
 */

"use strict";

const Server = require("./server");
let index;

/***
 * This function creates and returns a singleton server object
 * @returns {Server}
 */
function tiny() {
    if (!index) {
        index = new Server();
    }

    return index;
}

module.exports = tiny;