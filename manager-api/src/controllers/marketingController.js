const pool = require('../config/db');
const { toCamelArray } = require('../utils/toCamel');

function parsePagination(req) {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const pageSize = Math.min(Math.max(parseInt(req.query.pageSize || '10', 10), 1), 50);
  const offset = (page - 1) * pageSize;
  return { page, pageSize, offset };
}

exports.getAnalysis = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM marketing_analysis WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    [req.user.id]
  );

  if (!rows.length) {
    return res.json({ data: null });
  }

  const analysis = rows[0];
  res.json({
    data: {
      cards: [
        { title: '社交媒体影响力', value: analysis.social_influence, trend: analysis.social_trend, trendType: String(analysis.social_trend).startsWith('+') ? 'up' : 'down', icon: 'trending_up' },
        { title: '内容互动率', value: analysis.engagement_rate, trend: analysis.engagement_trend, trendType: String(analysis.engagement_trend).startsWith('+') ? 'up' : 'down', icon: 'insert_chart' },
        { title: '粉丝增长率', value: analysis.follower_growth, trend: analysis.follower_trend, trendType: String(analysis.follower_trend).startsWith('+') ? 'up' : 'down', icon: 'groups' },
        { title: '内容质量评分', value: analysis.content_quality, trend: analysis.quality_trend, trendType: String(analysis.quality_trend).startsWith('+') ? 'up' : 'down', icon: 'star' },
      ],
      summary: analysis.analysis_summary,
    },
  });
};

exports.getStrategies = async (_req, res) => {
  res.json({
    data: [
      {
        title: '宣发策略',
        description: '围绕酒店定位组织高质量社媒内容，优先放大场景感和体验感强的主题。',
        icon: 'campaign',
        tags: ['高端生活方式', '季节性促销', 'KOL合作'],
      },
      {
        title: '内容调性',
        description: '建议用专业、克制、质感明确的表达方式，强化品牌辨识度。',
        icon: 'style',
        tags: ['优雅', '专业', '体验导向'],
      },
    ],
  });
};

exports.getHotTopics = async (_req, res) => {
  res.json({
    data: [
      { topic: '#豪华酒店探店', heat: '95%', match: '98%' },
      { topic: '#周末度假去哪里', heat: '92%', match: '95%' },
      { topic: '#城市地标酒店', heat: '88%', match: '90%' },
      { topic: '#商务旅行首选', heat: '85%', match: '87%' },
      { topic: '#酒店美食推荐', heat: '82%', match: '85%' },
    ],
  });
};

exports.getCalendar = async (_req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = now.getDate();
  const contentDates = new Set([3, 5, 7, 10, 13, 15, 17, 20, 23, 26, 29]);

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i += 1) {
    days.push({ date: 0, day: '', hasContent: false, isToday: false });
  }
  for (let date = 1; date <= daysInMonth; date += 1) {
    days.push({
      date,
      day: '',
      hasContent: contentDates.has(date),
      isToday: date === today,
    });
  }

  res.json({ data: days, month: month + 1, year });
};

exports.getPublishSuggestions = async (_req, res) => {
  res.json({
    data: [
      { time: '10:00', platform: '小红书', type: '图文', title: '酒店下午茶体验分享' },
      { time: '14:00', platform: '抖音', type: '短视频', title: '豪华套房开箱视频' },
      { time: '20:00', platform: '抖音', type: '直播', title: '夜景露台直播' },
    ],
  });
};

exports.getReports = async (req, res) => {
  const { page, pageSize, offset } = parsePagination(req);
  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM marketing_reports WHERE user_id = ?',
    [req.user.id],
  );
  const [rows] = await pool.query(
    'SELECT * FROM marketing_reports WHERE user_id = ? ORDER BY report_date DESC LIMIT ? OFFSET ?',
    [req.user.id, pageSize, offset]
  );
  res.json({ data: toCamelArray(rows), total, page, pageSize });
};

exports.createReport = async (req, res) => {
  const { title } = req.body;
  const today = new Date().toISOString().slice(0, 10);
  const [result] = await pool.query(
    'INSERT INTO marketing_reports (user_id, title, report_date, status) VALUES (?, ?, ?, ?)',
    [req.user.id, title, today, 'draft']
  );
  res.status(201).json({
    data: { id: result.insertId, title, reportDate: today, status: 'draft', views: 0 },
  });
};
