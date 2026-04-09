require('dotenv').config();
const mysql = require('mysql2/promise');

const timeoutMs = parseInt(process.env.DB_WAIT_TIMEOUT_MS || '60000', 10);
const intervalMs = parseInt(process.env.DB_WAIT_INTERVAL_MS || '2000', 10);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDb() {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER || 'creative_user',
        password: process.env.DB_PASSWORD || 'creative_pass',
        database: process.env.DB_NAME || 'hotel_creative',
      });

      await connection.query('SELECT 1');
      await connection.end();
      console.log('Database is ready.');
      return;
    } catch (error) {
      process.stdout.write(`Waiting for database: ${error.code || error.message}\n`);
      await sleep(intervalMs);
    }
  }

  throw new Error(`Database was not ready within ${timeoutMs}ms`);
}

waitForDb().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
