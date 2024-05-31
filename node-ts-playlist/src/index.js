"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
const string_decoder_1 = require("string_decoder");
const httpRequests_1 = require("./httpRequests");
const path_1 = require("path");
const fs_1 = require("fs");
const multiparty_1 = require("multiparty");
const port = 3000;
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];
const server = http_1.default.createServer((req, res) => {
    const parsedUrl = (0, url_1.parse)(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toUpperCase();
    const decoder = new string_decoder_1.StringDecoder('utf-8');
    let buffer = '';
    if (path === 'upload' && method === 'POST') {
        const form = new multiparty_1.Form();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to parse form data' }));
                return;
            }
            const uploadPath = (0, path_1.join)(__dirname, 'uploads');
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            for (const fileKey in files) {
                const file = files[fileKey][0];
                const tempPath = file.path;
                const fileName = `${Date.now()}-${file.originalFilename}`;
                const destPath = (0, path_1.join)(uploadPath, fileName);
                const readStream = (0, fs_1.createReadStream)(tempPath);
                const writeStream = (0, fs_1.createWriteStream)(destPath);
                readStream.pipe(writeStream);
                readStream.on('end', () => {
                    writeStream.close();
                });
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'File uploaded successfully' }));
        });
    }
    else {
        req.on('data', (chunk) => {
            buffer += decoder.write(chunk);
        });
        req.on('end', () => {
            buffer += decoder.end();
            let statusCode = 404;
            let response = { message: 'Not Found' };
            if (path === 'users') {
                if (method === 'GET') {
                    statusCode = 200;
                    response = users;
                }
                else if (method === 'POST') {
                    const newUser = JSON.parse(buffer);
                    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
                    users.push(newUser);
                    statusCode = 201;
                    response = newUser;
                    (0, httpRequests_1.sendJsonHttp)('http://localhost:3000/api/json', newUser);
                    (0, httpRequests_1.sendFormHttp)('http://localhost:3000/api/form', { username: newUser.name, email: newUser.email });
                }
            }
            else if (path.match(/^users\/\d+$/)) {
                const id = parseInt(path.split('/')[1], 10);
                const userIndex = users.findIndex(u => u.id === id);
                if (userIndex !== -1) {
                    if (method === 'GET') {
                        statusCode = 200;
                        response = users[userIndex];
                    }
                    else if (method === 'PUT') {
                        const updatedUser = JSON.parse(buffer);
                        users[userIndex] = Object.assign(Object.assign({}, updatedUser), { id });
                        statusCode = 200;
                        response = users[userIndex];
                    }
                    else if (method === 'PATCH') {
                        const updatedUser = JSON.parse(buffer);
                        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), updatedUser);
                        statusCode = 200;
                        response = users[userIndex];
                    }
                    else if (method === 'DELETE') {
                        users = users.filter(u => u.id !== id);
                        statusCode = 204;
                        response = {};
                    }
                }
                else {
                    statusCode = 404;
                    response = { message: 'User not found' };
                }
            }
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(JSON.stringify(response));
        });
    }
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
