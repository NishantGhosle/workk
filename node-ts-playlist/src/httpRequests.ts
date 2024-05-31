import http from 'http';
import { URLSearchParams } from 'url';

export const sendJsonHttp = (url: string, data: object) => {
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

  const req = http.request(options, (res) => {
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

export const sendFormHttp = (url: string, data: object) => {
  const formData = new URLSearchParams(data as any).toString();
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

  const req = http.request(options, (res) => {
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
