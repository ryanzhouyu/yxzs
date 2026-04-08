const pool = require('../config/db');
const { toCamel, toCamelArray } = require('../utils/toCamel');

exports.list = async (req, res) => {
  const [videos] = await pool.query('SELECT * FROM videos ORDER BY id');

  const result = [];
  for (const v of videos) {
    const [hashtags] = await pool.query('SELECT tag FROM video_hashtags WHERE video_id = ?', [v.id]);
    const item = toCamel(v);
    item.hashtags = hashtags.map((h) => h.tag);

    // Check liked status if user is authenticated
    if (req.user) {
      const [likes] = await pool.query(
        'SELECT id FROM user_likes WHERE user_id = ? AND video_id = ?',
        [req.user.id, v.id]
      );
      item.liked = likes.length > 0;
    } else {
      item.liked = false;
    }

    result.push(item);
  }

  res.json({ data: result, total: result.length });
};

exports.getBySlug = async (req, res) => {
  const { slug } = req.params;
  const [videos] = await pool.query('SELECT * FROM videos WHERE slug = ?', [slug]);
  if (!videos.length) {
    return res.status(404).json({ error: '视频不存在' });
  }

  const video = toCamel(videos[0]);
  const videoId = videos[0].id;

  const [hashtags] = await pool.query('SELECT tag FROM video_hashtags WHERE video_id = ?', [videoId]);
  video.hashtags = hashtags.map((h) => h.tag);

  const [trends] = await pool.query('SELECT * FROM video_trends WHERE video_id = ? ORDER BY date', [videoId]);
  video.trends = toCamelArray(trends);

  const [hotContents] = await pool.query('SELECT * FROM hot_contents WHERE video_id = ?', [videoId]);
  video.hotContents = toCamelArray(hotContents);

  if (req.user) {
    const [likes] = await pool.query(
      'SELECT id FROM user_likes WHERE user_id = ? AND video_id = ?',
      [req.user.id, videoId]
    );
    video.liked = likes.length > 0;
  } else {
    video.liked = false;
  }

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
    [videos[0].id]
  );

  const result = toCamelArray(topics).map((t, i) => ({
    ...t,
    isFirst: i === 0,
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
    [userId, videoId]
  );

  if (existing.length) {
    await pool.query('DELETE FROM user_likes WHERE user_id = ? AND video_id = ?', [userId, videoId]);
    res.json({ liked: false });
  } else {
    await pool.query('INSERT INTO user_likes (user_id, video_id) VALUES (?, ?)', [userId, videoId]);
    res.json({ liked: true });
  }
};
