CREATE TABLE IF NOT EXISTS video_hashtags (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  video_id INT         NOT NULL,
  tag      VARCHAR(50) NOT NULL,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
