CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(100) NOT NULL DEFAULT '',
  avatar_url VARCHAR(500) DEFAULT NULL,
  hotel_name VARCHAR(200) DEFAULT NULL,
  status ENUM('active', 'disabled') NOT NULL DEFAULT 'active',
  last_login_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_users_username (username),
  KEY idx_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE video_contents (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  cover_url VARCHAR(500) NOT NULL,
  primary_category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'published',
  published_at DATETIME DEFAULT NULL,
  avg_rating DECIMAL(4,2) DEFAULT NULL,
  view_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  like_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  comment_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  share_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  bookmark_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_video_contents_slug (slug),
  KEY idx_video_contents_status_published (status, published_at),
  KEY idx_video_contents_category (primary_category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE video_content_tags (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  video_content_id BIGINT UNSIGNED NOT NULL,
  tag_name VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_video_content_tags_video
    FOREIGN KEY (video_content_id) REFERENCES video_contents(id) ON DELETE CASCADE,
  UNIQUE KEY uk_video_content_tags (video_content_id, tag_name),
  KEY idx_video_content_tags_tag_name (tag_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE video_daily_metrics (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  video_content_id BIGINT UNSIGNED NOT NULL,
  metric_date DATE NOT NULL,
  view_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  like_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  comment_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  share_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  bookmark_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_video_daily_metrics_video
    FOREIGN KEY (video_content_id) REFERENCES video_contents(id) ON DELETE CASCADE,
  UNIQUE KEY uk_video_daily_metrics (video_content_id, metric_date),
  KEY idx_video_daily_metrics_date (metric_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE video_hotspot_references (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  video_content_id BIGINT UNSIGNED NOT NULL,
  platform ENUM('douyin', 'xiaohongshu', 'wechat', 'weibo', 'other') NOT NULL,
  content_type ENUM('video', 'image', 'article', 'live', 'other') NOT NULL,
  title VARCHAR(200) NOT NULL,
  cover_url VARCHAR(500) DEFAULT NULL,
  source_url VARCHAR(1000) DEFAULT NULL,
  view_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  heat_score DECIMAL(8,2) DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_video_hotspot_references_video
    FOREIGN KEY (video_content_id) REFERENCES video_contents(id) ON DELETE CASCADE,
  KEY idx_video_hotspot_references_video (video_content_id, platform, content_type),
  KEY idx_video_hotspot_references_heat (platform, heat_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE video_topic_steps (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  video_content_id BIGINT UNSIGNED NOT NULL,
  step_no INT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  topic_type VARCHAR(50) NOT NULL,
  duration_seconds INT UNSIGNED DEFAULT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_video_topic_steps_video
    FOREIGN KEY (video_content_id) REFERENCES video_contents(id) ON DELETE CASCADE,
  UNIQUE KEY uk_video_topic_steps (video_content_id, step_no),
  KEY idx_video_topic_steps_video (video_content_id, step_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_video_preferences (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  video_content_id BIGINT UNSIGNED NOT NULL,
  preference_type ENUM('like', 'bookmark') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_video_preferences_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_video_preferences_video
    FOREIGN KEY (video_content_id) REFERENCES video_contents(id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_video_preferences (user_id, video_content_id, preference_type),
  KEY idx_user_video_preferences_video (video_content_id, preference_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE industry_snapshots (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  industry_name VARCHAR(100) NOT NULL,
  snapshot_date DATE NOT NULL,
  heat_level VARCHAR(20) NOT NULL,
  total_exposure_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  exposure_trend_pct DECIMAL(6,2) DEFAULT NULL,
  douyin_exposure_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  xiaohongshu_exposure_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  engagement_rate_pct DECIMAL(6,2) DEFAULT NULL,
  engagement_trend_pct DECIMAL(6,2) DEFAULT NULL,
  douyin_engagement_pct DECIMAL(6,2) DEFAULT NULL,
  xiaohongshu_engagement_pct DECIMAL(6,2) DEFAULT NULL,
  video_content_pct DECIMAL(5,2) DEFAULT NULL,
  image_content_pct DECIMAL(5,2) DEFAULT NULL,
  total_content_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_industry_snapshots (industry_name, snapshot_date),
  KEY idx_industry_snapshots_date (snapshot_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE industry_region_rankings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  industry_snapshot_id BIGINT UNSIGNED NOT NULL,
  rank_no INT UNSIGNED NOT NULL,
  region_name VARCHAR(50) NOT NULL,
  description VARCHAR(100) NOT NULL,
  score_pct DECIMAL(6,2) DEFAULT NULL,
  color_token VARCHAR(100) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_industry_region_rankings_snapshot
    FOREIGN KEY (industry_snapshot_id) REFERENCES industry_snapshots(id) ON DELETE CASCADE,
  UNIQUE KEY uk_industry_region_rankings (industry_snapshot_id, rank_no),
  KEY idx_industry_region_rankings_region (industry_snapshot_id, region_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE industry_hot_topics (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  industry_snapshot_id BIGINT UNSIGNED NOT NULL,
  topic_title VARCHAR(50) NOT NULL,
  heat_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  display_size ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'small',
  color_token VARCHAR(100) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_industry_hot_topics_snapshot
    FOREIGN KEY (industry_snapshot_id) REFERENCES industry_snapshots(id) ON DELETE CASCADE,
  UNIQUE KEY uk_industry_hot_topics (industry_snapshot_id, topic_title),
  KEY idx_industry_hot_topics_heat (industry_snapshot_id, heat_count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_calendar_entries (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  entry_date DATE NOT NULL,
  title VARCHAR(200) NOT NULL,
  time_hint VARCHAR(20) DEFAULT NULL,
  day_label VARCHAR(10) DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  status ENUM('planned', 'published', 'cancelled') NOT NULL DEFAULT 'planned',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_calendar_entries_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_calendar_entries (user_id, entry_date, title),
  KEY idx_user_calendar_entries_date (user_id, entry_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_inspirations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200) NOT NULL DEFAULT '',
  source_url VARCHAR(1000) DEFAULT NULL,
  source_platform VARCHAR(50) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_inspirations_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_inspirations (user_id, image_url),
  KEY idx_user_inspirations_created (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ai_generated_assets (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  asset_type ENUM('image', 'copy', 'poster', 'other') NOT NULL DEFAULT 'image',
  image_url VARCHAR(500) DEFAULT NULL,
  prompt_text TEXT DEFAULT NULL,
  generation_model VARCHAR(100) DEFAULT NULL,
  status ENUM('draft', 'ready', 'archived') NOT NULL DEFAULT 'ready',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ai_generated_assets_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_ai_generated_assets_created (user_id, created_at),
  KEY idx_ai_generated_assets_status (user_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE marketing_analysis_snapshots (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  snapshot_date DATE NOT NULL,
  social_influence_score DECIMAL(6,2) DEFAULT NULL,
  social_trend_pct DECIMAL(6,2) DEFAULT NULL,
  engagement_rate_pct DECIMAL(6,2) DEFAULT NULL,
  engagement_trend_pct DECIMAL(6,2) DEFAULT NULL,
  follower_growth_pct DECIMAL(6,2) DEFAULT NULL,
  follower_trend_pct DECIMAL(6,2) DEFAULT NULL,
  content_quality_score DECIMAL(6,2) DEFAULT NULL,
  quality_trend_pct DECIMAL(6,2) DEFAULT NULL,
  analysis_summary TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_marketing_analysis_snapshots_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uk_marketing_analysis_snapshots (user_id, snapshot_date),
  KEY idx_marketing_analysis_snapshots_created (user_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE marketing_reports (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(200) NOT NULL,
  report_date DATE NOT NULL,
  report_type ENUM('analysis', 'strategy', 'calendar', 'other') NOT NULL DEFAULT 'analysis',
  status ENUM('draft', 'completed', 'archived') NOT NULL DEFAULT 'draft',
  view_count BIGINT UNSIGNED NOT NULL DEFAULT 0,
  content LONGTEXT DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_marketing_reports_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_marketing_reports_date (user_id, report_date, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
