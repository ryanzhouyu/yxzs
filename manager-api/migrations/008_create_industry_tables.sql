CREATE TABLE IF NOT EXISTS industry_metrics (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  industry_name     VARCHAR(100) NOT NULL,
  heat_level        VARCHAR(20)  NOT NULL,
  total_exposure    VARCHAR(20)  NOT NULL,
  exposure_trend    VARCHAR(20)  NOT NULL,
  douyin_exposure   VARCHAR(20)  NOT NULL,
  xhs_exposure      VARCHAR(20)  NOT NULL,
  engagement_rate   VARCHAR(20)  NOT NULL,
  engagement_trend  VARCHAR(20)  NOT NULL,
  douyin_engagement VARCHAR(20)  NOT NULL,
  xhs_engagement    VARCHAR(20)  NOT NULL,
  video_pct         INT DEFAULT 65,
  image_pct         INT DEFAULT 35,
  total_content     VARCHAR(20)  NOT NULL,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS region_rankings (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  metric_id   INT          NOT NULL,
  rank_num    INT          NOT NULL,
  name        VARCHAR(50)  NOT NULL,
  description VARCHAR(100) NOT NULL,
  score       VARCHAR(10)  NOT NULL,
  color       VARCHAR(100) NOT NULL DEFAULT '',
  FOREIGN KEY (metric_id) REFERENCES industry_metrics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hot_topic_tags (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  metric_id INT          NOT NULL,
  title     VARCHAR(50)  NOT NULL,
  heat      VARCHAR(20)  NOT NULL,
  size      VARCHAR(10)  NOT NULL DEFAULT 'small',
  color     VARCHAR(100) NOT NULL DEFAULT '',
  FOREIGN KEY (metric_id) REFERENCES industry_metrics(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
