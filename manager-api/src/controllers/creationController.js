const pool = require('../config/db');
const { toCamelArray } = require('../utils/toCamel');

exports.getCalendar = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM calendar_entries WHERE user_id = ? ORDER BY entry_date LIMIT 7',
    [req.user.id]
  );
  res.json({ data: toCamelArray(rows) });
};

exports.getInspirations = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM saved_inspirations WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json({ data: toCamelArray(rows) });
};

exports.saveInspiration = async (req, res) => {
  const { imgSrc, altText } = req.body;
  const [result] = await pool.query(
    'INSERT INTO saved_inspirations (user_id, img_src, alt_text) VALUES (?, ?, ?)',
    [req.user.id, imgSrc, altText || '']
  );
  res.status(201).json({ data: { id: result.insertId, imgSrc, altText: altText || '' } });
};

exports.getWorks = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM ai_works WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id]
  );
  res.json({ data: toCamelArray(rows) });
};
