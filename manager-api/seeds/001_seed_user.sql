-- Demo user: demo / demo123
-- password_hash is bcrypt of 'demo123' with 10 rounds
INSERT INTO users (username, password_hash, nickname, hotel_name) VALUES
('demo', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '演示用户', '璞悦精品酒店');
