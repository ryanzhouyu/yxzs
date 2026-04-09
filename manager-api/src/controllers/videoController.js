const pool = require('../config/db');
const { toCamel, toCamelArray } = require('../utils/toCamel');

function parsePagination(req) {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '20', 10), 1), 50);
  const offset = (page - 1) * pageSize;
  return { page, pageSize, offset };
}

exports.list = async (req, res) => {
  const { page, pageSize, offset } = parsePagination(req);
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM videos');
  const [videos] = await pool.query(
    `
      SELECT
        v.*,
        GROUP_CONCAT(vh.tag ORDER BY vh.id SEPARATOR '||') AS hashtag_list
      FROM videos v
      LEFT JOIN video_hashtags vh ON vh.video_id = v.id
      GROUP BY v.id
      ORDER BY v.id
      LIMIT ? OFFSET ?
    `,
    [pageSize, offset],
  );

  const videoIds = videos.map((video) => video.id);
  let likedSet = new Set();

  if (req.user && videoIds.length) {
    const [likes] = await pool.query(
      `SELECT video_id FROM user_likes WHERE user_id = ? AND video_id IN (${videoIds.map(() => '?').join(',')})`,
      [req.user.id, ...videoIds],
    );
    likedSet = new Set(likes.map((item) => item.video_id));
  }

  const result = videos.map((video) => {
    const item = toCamel(video);
    item.hashtags = item.hashtagList ? item.hashtagList.split('||').filter(Boolean) : [];
    delete item.hashtagList;
    item.liked = likedSet.has(video.id);
    return item;
  });

  res.json({ data: result, total, page, pageSize });
};

exports.getBySlug = async (req, res) => {
  const { slug } = req.params;
  const [videos] = await pool.query('SELECT * FROM videos WHERE slug = ?', [slug]);
  if (!videos.length) {
    return res.status(404).json({ error: '视频不存在' });
  }

  const video = toCamel(videos[0]);
  const videoId = videos[0].id;

  const [hashtags, trends, hotContents, likes] = await Promise.all([
    pool.query('SELECT tag FROM video_hashtags WHERE video_id = ?', [videoId]),
    pool.query('SELECT * FROM video_trends WHERE video_id = ? ORDER BY date', [videoId]),
    pool.query('SELECT * FROM hot_contents WHERE video_id = ?', [videoId]),
    req.user
      ? pool.query('SELECT id FROM user_likes WHERE user_id = ? AND video_id = ?', [req.user.id, videoId])
      : Promise.resolve([[]]),
  ]);

  video.hashtags = hashtags[0].map((item) => item.tag);
  video.trends = toCamelArray(trends[0]);
  video.hotContents = toCamelArray(hotContents[0]);
  video.liked = Boolean(likes[0].length);

  res.json({ data: video });
};

exports.getTopics = async (req, res) => {
  const { slug } = req.params;
  const [videos] = await pool.query('SELECT id FROM videos WHERE slug = ?', [slug]);
  if (!videos.length) {
    return res.status(404).json({ error: '视频不存在' });
  }

  const [topics] = await pool.query(
    'SELECT * FROM topics WHERE video_id = ? ORDER BY sort_order',
    [videos[0].id],
  );

  const result = toCamelArray(topics).map((topic, index) => ({
    ...topic,
    isFirst: index === 0,
  }));

  res.json({ data: result });
};

exports.toggleLike = async (req, res) => {
  const { slug } = req.params;
  const [videos] = await pool.query('SELECT id FROM videos WHERE slug = ?', [slug]);
  if (!videos.length) {
    return res.status(404).json({ error: '视频不存在' });
  }

  const videoId = videos[0].id;
  const userId = req.user.id;

  const [existing] = await pool.query(
    'SELECT id FROM user_likes WHERE user_id = ? AND video_id = ?',
    [userId, videoId],
  );

  if (existing.length) {
    await pool.query('DELETE FROM user_likes WHERE user_id = ? AND video_id = ?', [userId, videoId]);
    return res.json({ liked: false });
  }

  await pool.query('INSERT INTO user_likes (user_id, video_id) VALUES (?, ?)', [userId, videoId]);
  return res.json({ liked: true });
};
