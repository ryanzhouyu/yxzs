CREATE TABLE IF NOT EXISTS topics (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  video_id    INT          NOT NULL,
  title       VARCHAR(200) NOT NULL,
  type        VARCHAR(50)  NOT NULL,
  duration    VARCHAR(20)  NOT NULL,
  description TEXT         NOT NULL,
  img_src     VARCHAR(500) NOT NULL,
  sort_order  INT          DEFAULT 0,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
