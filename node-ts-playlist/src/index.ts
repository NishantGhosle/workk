import http, { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { StringDecoder } from 'string_decoder';
import { User } from './types';
import { sendJsonHttp, sendFormHttp } from './httpRequests';
import { join } from 'path';
import { existsSync, mkdirSync, createReadStream, createWriteStream } from 'fs';
import { Form } from 'multiparty';

const port = 3000;

let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url!, true);
  const path = parsedUrl.pathname!.replace(/^\/+|\/+$/g, '');
  const method = req.method!.toUpperCase();
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  if (path === 'upload' && method === 'POST') {
    const form = new Form();

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to parse form data' }));
        return;
      }

      const uploadPath = join(__dirname, 'uploads');
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      for (const fileKey in files) {
        const file = files[fileKey][0];
        const tempPath = file.path;
        const fileName = `${Date.now()}-${file.originalFilename}`;
        const destPath = join(uploadPath, fileName);

        const readStream = createReadStream(tempPath);
        const writeStream = createWriteStream(destPath);

        readStream.pipe(writeStream);

        readStream.on('end', () => {
          writeStream.close();
        });
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'File uploaded successfully' }));
    });
  } else {
    req.on('data', (chunk) => {
      buffer += decoder.write(chunk);
    });

    req.on('end', () => {
      buffer += decoder.end();
      let statusCode = 404;
      let response: object = { message: 'Not Found' };

      if (path === 'users') {
        if (method === 'GET') {
          statusCode = 200;
          response = users;
        } else if (method === 'POST') {
          const newUser: User = JSON.parse(buffer);
          newUser.id = users.length ? (users[users.length - 1].id as number) + 1 : 1;
          users.push(newUser);
          statusCode = 201;
          response = newUser;

          sendJsonHttp('http://localhost:3000/api/json', newUser);
          sendFormHttp('http://localhost:3000/api/form', { username: newUser.name, email: newUser.email });
        }
      } else if (path.match(/^users\/\d+$/)) {
        const id = parseInt(path.split('/')[1], 10);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex !== -1) {
          if (method === 'GET') {
            statusCode = 200;
            response = users[userIndex];
          } else if (method === 'PUT') {
            const updatedUser: User = JSON.parse(buffer);
            users[userIndex] = { ...updatedUser, id }; 
            statusCode = 200;
            response = users[userIndex];
          } else if (method === 'PATCH') {
            const updatedUser: Partial<User> = JSON.parse(buffer);
            users[userIndex] = { ...users[userIndex], ...updatedUser }; 
            statusCode = 200;
            response = users[userIndex];
          } else if (method === 'DELETE') {
            users = users.filter(u => u.id !== id);
            statusCode = 204;
            response = {};
          }
        } else {
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