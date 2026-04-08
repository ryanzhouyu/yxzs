require('dotenv').config();
const pool = require('../src/config/db');
const { execSync } = require('child_process');

async function reset() {
  const conn = await pool.getConnection();
  try {
    // Get all tables
    const [tables] = await conn.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
      [process.env.DB_NAME || 'hotel_creative']
    );

    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const { TABLE_NAME } of tables) {
      await conn.query(`DROP TABLE IF EXISTS \`${TABLE_NAME}\``);
    }
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('All tables dropped.');
  } finally {
    conn.release();
    await pool.end();
  }

  // Run migrate then seed
  execSync('node scripts/migrate.js', { stdio: 'inherit', cwd: __dirname + '/..' });
  execSync('node scripts/seed.js', { stdio: 'inherit', cwd: __dirname + '/..' });
}

reset().catch((err) => {
  console.error('Reset failed:', err.message);
  process.exit(1);
});
