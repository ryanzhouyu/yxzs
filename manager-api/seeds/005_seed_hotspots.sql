-- Industry metrics
INSERT INTO industry_metrics (industry_name, heat_level, total_exposure, exposure_trend, douyin_exposure, xhs_exposure, engagement_rate, engagement_trend, douyin_engagement, xhs_engagement, video_pct, image_pct, total_content) VALUES
('酒店旅游行业', '极高热度', '1.2M', '+15.4%', '800K', '400K', '8.2%', '+2.1%', '5.8%', '12.6%', 65, 35, '1.2M');

-- Region rankings
INSERT INTO region_rankings (metric_id, rank_num, name, description, score, color) VALUES
(1, 1, '黄浦区', '外滩江景房热度', '95%', 'from-yellow-300 to-yellow-600'),
(1, 2, '浦东新区', '迪士尼周边热度', '82%', 'from-gray-300 to-gray-500'),
(1, 3, '静安区', '设计酒店受捧', '68%', 'from-orange-300 to-orange-600');

-- Hot topic tags
INSERT INTO hot_topic_tags (metric_id, title, heat, size, color) VALUES
(1, '精品酒店', '98.5K', 'large', 'from-red-500 to-orange-500'),
(1, '明星打卡', '85.1K', 'medium', 'from-purple-500 to-indigo-500'),
(1, '亲子游', '72.3K', 'small', 'from-green-500 to-teal-500'),
(1, '周末去哪儿', '68.9K', 'small', 'from-blue-500 to-cyan-500');
