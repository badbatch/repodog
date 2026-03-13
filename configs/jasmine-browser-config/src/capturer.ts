import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const dir = path.resolve(process.cwd(), 'coverage');
fs.mkdirSync(dir, { recursive: true });

http
  .createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/__coverage__') {
      let body = '';

      req.on('data', (chunk: string) => (body += chunk));

      req.on('end', () => {
        const file = path.join(dir, 'jasmine-browser-coverage.json');
        fs.writeFileSync(file, body);
        res.end('ok');
      });

      return;
    }

    res.end();
  })
  .listen(3002);
