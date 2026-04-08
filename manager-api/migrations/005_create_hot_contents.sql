CREATE TABLE IF NOT EXISTS hot_contents (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  video_id INT          NOT NULL,
  platform VARCHAR(20)  NOT NULL,
  type     VARCHAR(20)  NOT NULL,
  title    VARCHAR(200) NOT NULL,
  views    VARCHAR(20)  NOT NULL,
  heat     VARCHAR(10)  NOT NULL,
  img_src  VARCHAR(500) NOT NULL,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
