CREATE TABLE IF NOT EXISTS video_trends (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  video_id  INT  NOT NULL,
  date      DATE NOT NULL,
  likes     INT  DEFAULT 0,
  bookmarks INT  DEFAULT 0,
  comments  INT  DEFAULT 0,
  shares    INT  DEFAULT 0,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
  UNIQUE KEY uk_video_date (video_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
