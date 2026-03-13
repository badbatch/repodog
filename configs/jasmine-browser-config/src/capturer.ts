import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const dir = path.resolve(process.cwd(), 'coverage');
console.log(`> coverage directory: ${dir}`);
fs.mkdirSync(dir, { recursive: true });
console.log(`> created coverage directory`);

http
  .createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/__coverage__') {
      console.log(`> received coverage data request`);
      let body = '';

      req.on('data', (chunk: string) => (body += chunk));

      req.on('end', () => {
        console.log(`> finished coverage data request`);
        const file = path.join(dir, 'jasmine-browser-coverage.json');
        console.log(`> writing data to: ${file}`);
        fs.writeFileSync(file, body);
        res.end('ok');
      });

      return;
    }

    res.end();
  })
  .listen(3002, () => {
    console.log(`> listen to port 3002`);
  });
