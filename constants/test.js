/**
 * tiny-server
 * test.js
 * Created by Sıdıka ÇAY on 27.01.2019
 */

const port = process.env.PORT || 8000;
const baseURL = "http://localhost:" + port;
const endPoint = {
    GET_WITHOUT_PARAMETER: "/testGet",
    GET_WITH_PARAMETER: "/testGetParam",
    POST: "/testPost",
    PUT: "/testPut",
    DELETE: "/testDelete",
    MIDDLEWARE: "/testMiddleware"
};

module.exports = {
    port,
    baseURL,
    endPoint
};