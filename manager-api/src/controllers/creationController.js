const pool = require('../config/db');
const { toCamelArray } = require('../utils/toCamel');

function parsePagination(req) {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '12', 10), 1), 50);
  const offset = (page - 1) * pageSize;
  return { page, pageSize, offset };
}

exports.getCalendar = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM calendar_entries WHERE user_id = ? ORDER BY entry_date LIMIT 7',
    [req.user.id]
  );
  res.json({ data: toCamelArray(rows) });
};

exports.getInspirations = async (req, res) => {
  const { page, pageSize, offset } = parsePagination(req);
  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM saved_inspirations WHERE user_id = ?',
    [req.user.id],
  );
  const [rows] = await pool.query(
    'SELECT * FROM saved_inspirations WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [req.user.id, pageSize, offset],
  );
  res.json({ data: toCamelArray(rows), total, page, pageSize });
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
  const { page, pageSize, offset } = parsePagination(req);
  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM ai_works WHERE user_id = ?',
    [req.user.id],
  );
  const [rows] = await pool.query(
    'SELECT * FROM ai_works WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [req.user.id, pageSize, offset],
  );
  res.json({ data: toCamelArray(rows), total, page, pageSize });
};
