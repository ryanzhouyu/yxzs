const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { sign } = require('../utils/jwt');
const { toCamel } = require('../utils/toCamel');

exports.register = async (req, res) => {
  const { username, password, nickname, hotel_name } = req.body;

  const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length) {
    return res.status(409).json({ error: '用户名已存在' });
  }

  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (username, password_hash, nickname, hotel_name) VALUES (?, ?, ?, ?)',
    [username, hash, nickname || '', hotel_name || null]
  );

  const token = sign({ id: result.insertId, username });
  res.status(201).json({
    token,
    user: { id: result.insertId, username, nickname: nickname || '', hotelName: hotel_name || null },
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (!rows.length) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }

  const token = sign({ id: user.id, username: user.username });
  const profile = toCamel(user);
  delete profile.passwordHash;
  res.json({ token, user: profile });
};

exports.me = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  if (!rows.length) {
    return res.status(404).json({ error: '用户不存在' });
  }
  const profile = toCamel(rows[0]);
  delete profile.passwordHash;
  res.json({ data: profile });
};
