const http = require('http');

function request(method, url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const req = http.request(
      {
        method,
        hostname: target.hostname,
        port: target.port,
        path: `${target.pathname}${target.search}`,
        headers,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, body: data });
        });
      }
    );

    req.on('error', reject);

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function run() {
  const health = await request('GET', 'http://127.0.0.1:4000/api/health');
  if (health.status !== 200) {
    throw new Error(`health failed: ${health.status}`);
  }

  const videos = await request('GET', 'http://127.0.0.1:4000/api/videos?page=1&pageSize=2');
  if (videos.status !== 200) {
    throw new Error(`videos failed: ${videos.status}`);
  }

  const login = await request(
    'POST',
    'http://127.0.0.1:4000/api/auth/login',
    JSON.stringify({ username: 'demo', password: 'demo123' }),
    { 'Content-Type': 'application/json' }
  );

  if (login.status !== 200) {
    throw new Error(`login failed: ${login.status} ${login.body}`);
  }

  const token = JSON.parse(login.body).token;

  const marketing = await request(
    'GET',
    'http://127.0.0.1:4000/api/marketing/analysis',
    null,
    { Authorization: `Bearer ${token}` }
  );

  if (marketing.status !== 200) {
    throw new Error(`marketing failed: ${marketing.status}`);
  }

  console.log('Smoke test passed.');
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
