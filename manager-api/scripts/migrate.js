require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function migrate() {
  const conn = await pool.getConnection();
  try {
    // Create migrations tracking table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [applied] = await conn.query('SELECT name FROM _migrations');
    const appliedSet = new Set(applied.map((r) => r.name));

    const dir = path.join(__dirname, '..', 'migrations');
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();

    for (const file of files) {
      if (appliedSet.has(file)) {
        console.log(`  skip: ${file} (already applied)`);
        continue;
      }
      const sql = fs.readFileSync(path.join(dir, file), 'utf8');
      // Split by semicolon to handle multiple statements per file
      const statements = sql.split(';').map((s) => s.trim()).filter(Boolean);
      for (const stmt of statements) {
        await conn.query(stmt);
      }
      await conn.query('INSERT INTO _migrations (name) VALUES (?)', [file]);
      console.log(`  done: ${file}`);
    }

    console.log('Migration complete.');
  } finally {
    conn.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
