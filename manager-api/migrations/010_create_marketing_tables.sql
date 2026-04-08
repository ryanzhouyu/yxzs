CREATE TABLE IF NOT EXISTS calendar_entries (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT          NOT NULL,
  entry_date  DATE         NOT NULL,
  day_label   VARCHAR(10)  NOT NULL,
  title       VARCHAR(200) NOT NULL,
  time_hint   VARCHAR(20)  NOT NULL,
  img_src     VARCHAR(500) DEFAULT NULL,
  description TEXT         DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS marketing_analysis (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  user_id           INT         NOT NULL,
  social_influence  VARCHAR(20) NOT NULL,
  social_trend      VARCHAR(20) NOT NULL,
  engagement_rate   VARCHAR(20) NOT NULL,
  engagement_trend  VARCHAR(20) NOT NULL,
  follower_growth   VARCHAR(20) NOT NULL,
  follower_trend    VARCHAR(20) NOT NULL,
  content_quality   VARCHAR(20) NOT NULL,
  quality_trend     VARCHAR(20) NOT NULL,
  analysis_summary  TEXT        NOT NULL,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS marketing_reports (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT          NOT NULL,
  title       VARCHAR(200) NOT NULL,
  report_date DATE         NOT NULL,
  status      VARCHAR(20)  DEFAULT 'draft',
  views       INT          DEFAULT 0,
  content     TEXT         DEFAULT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
