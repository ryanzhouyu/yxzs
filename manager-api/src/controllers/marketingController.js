const pool = require('../config/db');
const { toCamel, toCamelArray } = require('../utils/toCamel');

exports.getAnalysis = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM marketing_analysis WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    [req.user.id]
  );

  if (!rows.length) {
    return res.json({ data: null });
  }

  const analysis = toCamel(rows[0]);

  // Format into the card structure the frontend expects
  res.json({
    data: {
      cards: [
        { title: '社交媒体影响力', value: analysis.socialInfluence, trend: analysis.socialTrend, trendType: analysis.socialTrend.startsWith('+') ? 'up' : 'down', icon: 'trending_up' },
        { title: '内容互动率', value: analysis.engagementRate, trend: analysis.engagementTrend, trendType: analysis.engagementTrend.startsWith('+') ? 'up' : 'down', icon: 'insert_chart' },
        { title: '粉丝增长率', value: analysis.followerGrowth, trend: analysis.followerTrend, trendType: analysis.followerTrend.startsWith('+') ? 'up' : 'down', icon: 'groups' },
        { title: '内容质量评分', value: analysis.contentQuality, trend: analysis.qualityTrend, trendType: analysis.qualityTrend.startsWith('+') ? 'up' : 'down', icon: 'star' },
      ],
      summary: analysis.analysisSummary,
    },
  });
};

exports.getStrategies = async (_req, res) => {
  // Static strategy data for demo
  res.json({
    data: [
      {
        title: '宣发策略',
        description: '基于您酒店的豪华定位，建议采用高端生活方式内容为主，结合季节性促销活动',
        icon: 'campaign',
        tags: ['高端生活方式', '季节性促销', 'KOL合作'],
      },
      {
        title: '内容调性',
        description: '建议采用优雅、专业的调性，强调酒店的独特卖点和客户体验',
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
      { topic: '#周末度假好去处', heat: '92%', match: '95%' },
      { topic: '#城市地标酒店', heat: '88%', match: '90%' },
      { topic: '#商务旅行首选', heat: '85%', match: '87%' },
      { topic: '#酒店美食推荐', heat: '82%', match: '85%' },
    ],
  });
};

exports.getCalendar = async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = now.getDate();
  const contentDates = new Set([3, 5, 7, 10, 13, 15, 17, 20, 23, 26, 29]);

  const days = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: 0, day: '', hasContent: false, isToday: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: d,
      day: '',
      hasContent: contentDates.has(d),
      isToday: d === today,
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
  const [rows] = await pool.query(
    'SELECT * FROM marketing_reports WHERE user_id = ? ORDER BY report_date DESC',
    [req.user.id]
  );
  res.json({ data: toCamelArray(rows) });
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
