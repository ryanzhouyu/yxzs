const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, body });
      });
    });

    req.on('error', (error) => {
      resolve({ ok: false, status: 0, body: error.message });
    });
  });
}

async function run() {
  const checks = [
    ['frontend', 'http://127.0.0.1:3000'],
    ['backend', 'http://127.0.0.1:4000/api/health'],
  ];

  let failed = false;
  for (const [name, url] of checks) {
    const result = await check(url);
    console.log(`${name}: ${result.ok ? 'OK' : 'FAIL'} (${result.status})`);
    if (!result.ok) {
      console.log(`  ${result.body}`);
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }
}

run();
