"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFormHttp = exports.sendJsonHttp = void 0;
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
const sendJsonHttp = (url, data) => {
    const jsonData = JSON.stringify(data);
    const options = {
        hostname: new URL(url).hostname,
        port: new URL(url).port || 80,
        path: new URL(url).pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': jsonData.length,
        },
    };
    const req = http_1.default.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        res.on('end', () => {
            console.log('HTTP JSON Response:', responseData);
        });
    });
    req.on('error', (error) => {
        console.error('HTTP JSON Error:', error);
    });
    req.write(jsonData);
    req.end();
};
exports.sendJsonHttp = sendJsonHttp;
const sendFormHttp = (url, data) => {
    const formData = new url_1.URLSearchParams(data).toString();
    const options = {
        hostname: new URL(url).hostname,
        port: new URL(url).port || 80,
        path: new URL(url).pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': formData.length,
        },
    };
    const req = http_1.default.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        res.on('end', () => {
            console.log('HTTP Form Response:', responseData);
        });
    });
    req.on('error', (error) => {
        console.error('HTTP Form Error:', error);
    });
    req.write(formData);
    req.end();
};
exports.sendFormHttp = sendFormHttp;
