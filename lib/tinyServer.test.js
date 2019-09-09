/**
 * tiny-server
 * server.test.js
 * Created by Sıdıka ÇAY on 27.01.2019
 */

"use strict";
const {baseURL, endPoint, port} = require("../constants/test");
const httpStatusCode = require("../constants/index");

const axios = require("axios");
const expect = require("chai").expect;

describe("Tiny server C.R.U.D. functions test:", function () {
    const tiny = require("./index");
    const app = tiny();
    const response = {
        GET_WITHOUT_PARAMETER: "Get request successful",
        GET_WITH_PARAMETER: 3,
        POST: {id: 3},
        PUT: {id: 3},
        DELETE: 3
    };
    const httpClient = axios.create({
        baseURL: baseURL
    });

    before(function () {
        app.get(endPoint.GET_WITHOUT_PARAMETER, function (req, res) {
            return res.status(httpStatusCode.OK).send(response.GET_WITHOUT_PARAMETER);
        });

        app.get(endPoint.GET_WITH_PARAMETER, function (req, res) {
            const params = req.params;
            const id = params.id;
            return res.status(httpStatusCode.OK).send(id);
        });

        app.post(endPoint.POST, function (req, res) {
            let body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            }).on("end", () => {
                body = Buffer.concat(body).toString();
                return res.status(httpStatusCode.OK).send(body);
            });
        });

        app.put(endPoint.PUT, function (req, res) {
            let body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            }).on("end", () => {
                body = Buffer.concat(body).toString();
                return res.status(httpStatusCode.OK).send(body);
            });
        });

        app.delete(endPoint.DELETE, function (req, res) {
            const params = req.params;
            return res.status(httpStatusCode.OK).send(params.id);
        });

        app.listen(port, function () {
            //Listening server
        });
    });

    describe("Get functions tests: ", function () {
        it("testGet: It should return 'Get request successful'", function () {
            return httpClient.get(endPoint.GET_WITHOUT_PARAMETER)
                .then(function (res) {
                    return expect(response.GET_WITHOUT_PARAMETER).to.equal(res.data);
                });
        });

        it("testGet: It should return submitted id", function () {
            return httpClient.get(endPoint.GET_WITH_PARAMETER, {params: {id: 3}})
                .then(function (res) {
                    return expect(response.GET_WITH_PARAMETER).to.equal(res.data);
                });
        });

        it("testGet: It should return status code 200", function () {
            return httpClient.get(endPoint.GET_WITHOUT_PARAMETER)
                .then(function (res) {
                    return expect(httpStatusCode.OK).to.equal(res.status);
                });
        });
    });

    describe("Post functions tests", function () {
        it("testPost: It should return posted object...", function () {
            return httpClient.post(endPoint.POST, {id: 3})
                .then(function (res) {
                    return expect(response.POST).to.deep.equal(res.data);
                });
        });
    });

    describe("Put functions tests", function () {
        it("testPut: It should return updated object's id...", function () {
            return httpClient.put(endPoint.PUT, {id: 3})
                .then(function (res) {
                    return expect(response.PUT).to.deep.equal(res.data);
                });
        });
    });

    describe("Delete functions tests", function () {
        it("testDelete: It should return deleted object's id...", function () {
            return httpClient.delete(endPoint.DELETE, {params: {id: 3}})
                .then(function (res) {
                    return expect(response.DELETE).to.equal(res.data);
                });
        });
    });

    after(function () {
        app.close();
    });
});

describe("Tiny server functions test with middleware", function () {
    const tiny = require("./index");
    const app = tiny();
    const response = {
        POST: {id: 3}
    };
    const httpClient = axios.create({
        baseURL: baseURL
    });

    before(function () {
        app.use((req, res, next) => {
            let body = [];
            req.on("data", (chunk) => {
                body.push(chunk);
            }).on("end", () => {
                body = Buffer.concat(body).toString();
                req.body = body;
                next();
            });
        });
        app.post(endPoint.MIDDLEWARE, function (req, res) {
            return res.status(httpStatusCode.OK).send(req.body);
        });
        app.listen(port, function () {
            //Listening server
        });
    });

    describe("JSON parse middleware test", function () {
        it("testMiddleware: It should return posted object...", function () {
            return httpClient.post(endPoint.MIDDLEWARE, {id: 3})
                .then(function (res) {
                    return expect(response.POST).to.deep.equal(res.data);
                });
        });
    });

    after(function () {
        app.close();
    });
});

