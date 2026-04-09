const pool = require('../config/db');
const { toCamelArray } = require('../utils/toCamel');

exports.getAll = async (_req, res) => {
  const [metrics] = await pool.query('SELECT * FROM industry_metrics LIMIT 1');
  if (!metrics.length) {
    return res.json({ data: null });
  }

  const metric = metrics[0];
  const metricId = metric.id;
  const [regions] = await pool.query('SELECT * FROM region_rankings WHERE metric_id = ? ORDER BY rank_num', [metricId]);
  const [hotTopics] = await pool.query('SELECT * FROM hot_topic_tags WHERE metric_id = ?', [metricId]);

  res.json({
    data: {
      metrics: {
        industryName: metric.industry_name,
        heatLevel: metric.heat_level,
        totalExposure: metric.total_exposure,
        exposureTrend: metric.exposure_trend,
        douyinExposure: metric.douyin_exposure,
        xiaohongshuExposure: metric.xhs_exposure,
        engagementRate: metric.engagement_rate,
        engagementTrend: metric.engagement_trend,
        douyinEngagement: metric.douyin_engagement,
        xiaohongshuEngagement: metric.xhs_engagement,
        videoContentRate: `${metric.video_pct}%`,
        imageContentRate: `${metric.image_pct}%`,
        totalContent: metric.total_content,
      },
      regions: toCamelArray(regions).map((region) => ({
        rank: region.rankNum,
        name: region.name,
        desc: region.description,
        score: region.score,
        color: region.color,
      })),
      hotTopics: toCamelArray(hotTopics),
      trendTags: ['#特色民宿', '#无边泳池', '#情侣约会'],
    },
  });
};
