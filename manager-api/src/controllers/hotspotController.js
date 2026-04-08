const pool = require('../config/db');
const { toCamel, toCamelArray } = require('../utils/toCamel');

exports.getAll = async (_req, res) => {
  const [metrics] = await pool.query('SELECT * FROM industry_metrics LIMIT 1');
  if (!metrics.length) {
    return res.json({ data: null });
  }

  const metricId = metrics[0].id;
  const [regions] = await pool.query('SELECT * FROM region_rankings WHERE metric_id = ? ORDER BY rank_num', [metricId]);
  const [hotTopics] = await pool.query('SELECT * FROM hot_topic_tags WHERE metric_id = ?', [metricId]);

  res.json({
    data: {
      metrics: toCamel(metrics[0]),
      regions: toCamelArray(regions),
      hotTopics: toCamelArray(hotTopics),
      trendTags: ['#特色民宿', '#无边泳池', '#情侣约会'],
    },
  });
};
