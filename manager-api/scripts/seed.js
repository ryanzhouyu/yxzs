require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const pool = require('../src/config/db');

async function seed() {
  const conn = await pool.getConnection();
  try {
    // Clear existing data in reverse dependency order
    const tables = [
      'marketing_reports', 'marketing_analysis', 'calendar_entries',
      'ai_works', 'saved_inspirations',
      'hot_topic_tags', 'region_rankings', 'industry_metrics',
      'user_likes', 'topics', 'hot_contents', 'video_trends',
      'video_hashtags', 'videos', 'users'
    ];
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const t of tables) {
      await conn.query(`TRUNCATE TABLE ${t}`);
    }
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    // Generate proper bcrypt hash for demo user
    const hash = await bcrypt.hash('demo123', 10);

    // Insert demo user with real hash
    await conn.query(
      'INSERT INTO users (username, password_hash, nickname, hotel_name) VALUES (?, ?, ?, ?)',
      ['demo', hash, '演示用户', '璞悦精品酒店']
    );

    // Run remaining seed files (skip user seed since we did it above)
    const dir = path.join(__dirname, '..', 'seeds');
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql') && !f.includes('seed_user')).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(dir, file), 'utf8');
      const statements = sql
        .split(';')
        .map((s) => s.replace(/--.*$/gm, '').trim())
        .filter(Boolean);
      for (const stmt of statements) {
        await conn.query(stmt);
      }
      console.log(`  seeded: ${file}`);
    }

    console.log('Seed complete.');
  } finally {
    conn.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
