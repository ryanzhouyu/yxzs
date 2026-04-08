ALTER TABLE videos
  ADD COLUMN view_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER views,
  ADD COLUMN rating_value DECIMAL(4,2) DEFAULT NULL AFTER rating,
  ADD COLUMN like_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER likes,
  ADD COLUMN comment_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER comments,
  ADD COLUMN share_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER shares,
  ADD COLUMN bookmark_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER bookmarks;

ALTER TABLE video_hashtags
  ADD CONSTRAINT uk_video_hashtag UNIQUE (video_id, tag);

ALTER TABLE hot_contents
  ADD COLUMN view_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER views,
  ADD COLUMN heat_score DECIMAL(6,2) DEFAULT NULL AFTER heat,
  ADD INDEX idx_hot_contents_video_platform_type (video_id, platform, type);

ALTER TABLE topics
  ADD CONSTRAINT uk_topics_video_sort UNIQUE (video_id, sort_order),
  ADD INDEX idx_topics_video_sort (video_id, sort_order);

ALTER TABLE industry_metrics
  ADD COLUMN snapshot_date DATE DEFAULT NULL AFTER industry_name,
  ADD COLUMN total_exposure_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER total_exposure,
  ADD COLUMN exposure_trend_pct DECIMAL(6,2) DEFAULT NULL AFTER exposure_trend,
  ADD COLUMN douyin_exposure_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER douyin_exposure,
  ADD COLUMN xhs_exposure_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER xhs_exposure,
  ADD COLUMN engagement_rate_pct DECIMAL(6,2) DEFAULT NULL AFTER engagement_rate,
  ADD COLUMN engagement_trend_pct DECIMAL(6,2) DEFAULT NULL AFTER engagement_trend,
  ADD COLUMN douyin_engagement_pct DECIMAL(6,2) DEFAULT NULL AFTER douyin_engagement,
  ADD COLUMN xhs_engagement_pct DECIMAL(6,2) DEFAULT NULL AFTER xhs_engagement,
  ADD COLUMN total_content_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER total_content,
  ADD INDEX idx_industry_metrics_snapshot (industry_name, snapshot_date);

ALTER TABLE region_rankings
  ADD COLUMN snapshot_date DATE DEFAULT NULL AFTER metric_id,
  ADD COLUMN score_pct DECIMAL(6,2) DEFAULT NULL AFTER score,
  ADD CONSTRAINT uk_region_rankings_metric_rank UNIQUE (metric_id, rank_num),
  ADD INDEX idx_region_rankings_metric_rank (metric_id, rank_num);

ALTER TABLE hot_topic_tags
  ADD COLUMN snapshot_date DATE DEFAULT NULL AFTER metric_id,
  ADD COLUMN heat_count BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER heat,
  ADD CONSTRAINT uk_hot_topic_metric_title UNIQUE (metric_id, title),
  ADD INDEX idx_hot_topic_metric_heat (metric_id, heat_count);

ALTER TABLE saved_inspirations
  ADD CONSTRAINT uk_saved_inspirations_user_img UNIQUE (user_id, img_src(191)),
  ADD INDEX idx_saved_inspirations_user_created (user_id, created_at);

ALTER TABLE ai_works
  ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at,
  ADD INDEX idx_ai_works_user_created (user_id, created_at);

ALTER TABLE calendar_entries
  ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP AFTER description,
  ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at,
  ADD CONSTRAINT uk_calendar_user_date_title UNIQUE (user_id, entry_date, title(100)),
  ADD INDEX idx_calendar_user_date (user_id, entry_date);

ALTER TABLE marketing_analysis
  ADD COLUMN snapshot_date DATE DEFAULT NULL AFTER user_id,
  ADD COLUMN social_influence_score DECIMAL(6,2) DEFAULT NULL AFTER social_influence,
  ADD COLUMN social_trend_pct DECIMAL(6,2) DEFAULT NULL AFTER social_trend,
  ADD COLUMN engagement_rate_pct DECIMAL(6,2) DEFAULT NULL AFTER engagement_rate,
  ADD COLUMN engagement_trend_pct DECIMAL(6,2) DEFAULT NULL AFTER engagement_trend,
  ADD COLUMN follower_growth_pct DECIMAL(6,2) DEFAULT NULL AFTER follower_growth,
  ADD COLUMN follower_trend_pct DECIMAL(6,2) DEFAULT NULL AFTER follower_trend,
  ADD COLUMN content_quality_score DECIMAL(6,2) DEFAULT NULL AFTER content_quality,
  ADD COLUMN quality_trend_pct DECIMAL(6,2) DEFAULT NULL AFTER quality_trend,
  ADD INDEX idx_marketing_analysis_user_created (user_id, created_at),
  ADD INDEX idx_marketing_analysis_user_snapshot (user_id, snapshot_date);

ALTER TABLE marketing_reports
  ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at,
  ADD INDEX idx_marketing_reports_user_date (user_id, report_date);
