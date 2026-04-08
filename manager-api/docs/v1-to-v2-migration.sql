-- Assumptions:
-- 1. Source schema: hotel_creative
-- 2. Target schema: hotel_creative_v2
-- 3. schema-v2.sql has already been executed against hotel_creative_v2
-- 4. MySQL 8.0+ is available (REGEXP_REPLACE / window functions)

DROP FUNCTION IF EXISTS hotel_creative_v2.fn_parse_count;
DROP FUNCTION IF EXISTS hotel_creative_v2.fn_parse_percent;
DROP FUNCTION IF EXISTS hotel_creative_v2.fn_parse_score;
DROP FUNCTION IF EXISTS hotel_creative_v2.fn_map_platform;
DROP FUNCTION IF EXISTS hotel_creative_v2.fn_map_content_type;

DELIMITER $$

CREATE FUNCTION hotel_creative_v2.fn_parse_count(input_text VARCHAR(255))
RETURNS BIGINT
DETERMINISTIC
BEGIN
  DECLARE cleaned VARCHAR(255);
  DECLARE numeric_part DECIMAL(20,4);

  IF input_text IS NULL OR TRIM(input_text) = '' THEN
    RETURN 0;
  END IF;

  SET cleaned = UPPER(TRIM(input_text));
  SET numeric_part = CAST(NULLIF(REGEXP_REPLACE(cleaned, '[^0-9.+-]', ''), '') AS DECIMAL(20,4));

  IF numeric_part IS NULL THEN
    RETURN 0;
  END IF;

  IF RIGHT(cleaned, 1) = 'B' THEN
    RETURN CAST(numeric_part * 1000000000 AS UNSIGNED);
  ELSEIF RIGHT(cleaned, 1) = 'M' THEN
    RETURN CAST(numeric_part * 1000000 AS UNSIGNED);
  ELSEIF RIGHT(cleaned, 1) = 'K' THEN
    RETURN CAST(numeric_part * 1000 AS UNSIGNED);
  END IF;

  RETURN CAST(numeric_part AS UNSIGNED);
END$$

CREATE FUNCTION hotel_creative_v2.fn_parse_percent(input_text VARCHAR(255))
RETURNS DECIMAL(8,2)
DETERMINISTIC
BEGIN
  DECLARE cleaned VARCHAR(255);

  IF input_text IS NULL OR TRIM(input_text) = '' THEN
    RETURN NULL;
  END IF;

  SET cleaned = REGEXP_REPLACE(TRIM(input_text), '[^0-9.+-]', '');
  IF cleaned = '' THEN
    RETURN NULL;
  END IF;

  RETURN CAST(cleaned AS DECIMAL(8,2));
END$$

CREATE FUNCTION hotel_creative_v2.fn_parse_score(input_text VARCHAR(255))
RETURNS DECIMAL(8,2)
DETERMINISTIC
BEGIN
  DECLARE cleaned VARCHAR(255);

  IF input_text IS NULL OR TRIM(input_text) = '' THEN
    RETURN NULL;
  END IF;

  SET cleaned = UPPER(TRIM(input_text));

  IF cleaned REGEXP '/100' THEN
    RETURN CAST(REGEXP_REPLACE(cleaned, '/100', '') AS DECIMAL(8,2));
  END IF;

  SET cleaned = REGEXP_REPLACE(cleaned, '[^0-9.+-]', '');
  IF cleaned = '' THEN
    RETURN NULL;
  END IF;

  RETURN CAST(cleaned AS DECIMAL(8,2));
END$$

CREATE FUNCTION hotel_creative_v2.fn_map_platform(input_text VARCHAR(255))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
  DECLARE cleaned VARCHAR(255);
  SET cleaned = LOWER(TRIM(COALESCE(input_text, '')));

  IF cleaned IN ('douyin', 'dy') THEN
    RETURN 'douyin';
  ELSEIF cleaned IN ('xiaohongshu', 'xhs', 'red') THEN
    RETURN 'xiaohongshu';
  ELSEIF cleaned IN ('wechat', 'wx') THEN
    RETURN 'wechat';
  ELSEIF cleaned IN ('weibo', 'wb') THEN
    RETURN 'weibo';
  END IF;

  RETURN 'other';
END$$

CREATE FUNCTION hotel_creative_v2.fn_map_content_type(input_text VARCHAR(255))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
  DECLARE cleaned VARCHAR(255);
  SET cleaned = LOWER(TRIM(COALESCE(input_text, '')));

  IF cleaned IN ('video', 'short_video') THEN
    RETURN 'video';
  ELSEIF cleaned IN ('image', 'img', 'photo') THEN
    RETURN 'image';
  ELSEIF cleaned IN ('article', 'post') THEN
    RETURN 'article';
  ELSEIF cleaned IN ('live', 'stream') THEN
    RETURN 'live';
  END IF;

  RETURN 'other';
END$$

DELIMITER ;

START TRANSACTION;

INSERT INTO hotel_creative_v2.users (
  id,
  username,
  password_hash,
  nickname,
  avatar_url,
  hotel_name,
  status,
  last_login_at,
  created_at,
  updated_at
)
SELECT
  u.id,
  u.username,
  u.password_hash,
  u.nickname,
  u.avatar_url,
  u.hotel_name,
  'active',
  NULL,
  COALESCE(u.created_at, CURRENT_TIMESTAMP),
  COALESCE(u.updated_at, COALESCE(u.created_at, CURRENT_TIMESTAMP))
FROM hotel_creative.users u;

INSERT INTO hotel_creative_v2.video_contents (
  id,
  slug,
  title,
  cover_url,
  primary_category,
  description,
  status,
  published_at,
  avg_rating,
  view_count,
  like_count,
  comment_count,
  share_count,
  bookmark_count,
  created_at,
  updated_at
)
SELECT
  v.id,
  v.slug,
  v.title,
  v.img_src,
  v.tag,
  v.description,
  'published',
  v.created_at,
  hotel_creative_v2.fn_parse_score(v.rating),
  hotel_creative_v2.fn_parse_count(v.views),
  GREATEST(
    hotel_creative_v2.fn_parse_count(v.likes),
    COALESCE((SELECT COUNT(*) FROM hotel_creative.user_likes ul WHERE ul.video_id = v.id), 0)
  ),
  hotel_creative_v2.fn_parse_count(v.comments),
  hotel_creative_v2.fn_parse_count(v.shares),
  hotel_creative_v2.fn_parse_count(v.bookmarks),
  COALESCE(v.created_at, CURRENT_TIMESTAMP),
  COALESCE(v.updated_at, COALESCE(v.created_at, CURRENT_TIMESTAMP))
FROM hotel_creative.videos v;

INSERT INTO hotel_creative_v2.video_content_tags (
  video_content_id,
  tag_name,
  created_at
)
SELECT
  vh.video_id,
  vh.tag,
  CURRENT_TIMESTAMP
FROM hotel_creative.video_hashtags vh
GROUP BY vh.video_id, vh.tag;

INSERT INTO hotel_creative_v2.video_daily_metrics (
  video_content_id,
  metric_date,
  view_count,
  like_count,
  comment_count,
  share_count,
  bookmark_count,
  created_at
)
SELECT
  vt.video_id,
  vt.date,
  0,
  COALESCE(vt.likes, 0),
  COALESCE(vt.comments, 0),
  COALESCE(vt.shares, 0),
  COALESCE(vt.bookmarks, 0),
  CURRENT_TIMESTAMP
FROM hotel_creative.video_trends vt;

INSERT INTO hotel_creative_v2.video_hotspot_references (
  video_content_id,
  platform,
  content_type,
  title,
  cover_url,
  source_url,
  view_count,
  heat_score,
  published_at,
  created_at,
  updated_at
)
SELECT
  hc.video_id,
  hotel_creative_v2.fn_map_platform(hc.platform),
  hotel_creative_v2.fn_map_content_type(hc.type),
  hc.title,
  hc.img_src,
  NULL,
  hotel_creative_v2.fn_parse_count(hc.views),
  hotel_creative_v2.fn_parse_percent(hc.heat),
  NULL,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM hotel_creative.hot_contents hc;

INSERT INTO hotel_creative_v2.video_topic_steps (
  video_content_id,
  step_no,
  title,
  topic_type,
  duration_seconds,
  description,
  image_url,
  created_at,
  updated_at
)
SELECT
  x.video_id,
  x.step_no,
  x.title,
  x.type,
  CASE
    WHEN x.duration REGEXP '^[0-9]+$' THEN CAST(x.duration AS UNSIGNED)
    ELSE NULL
  END AS duration_seconds,
  x.description,
  x.img_src,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM (
  SELECT
    t.*,
    ROW_NUMBER() OVER (PARTITION BY t.video_id ORDER BY t.sort_order, t.id) AS step_no
  FROM hotel_creative.topics t
) x;

INSERT INTO hotel_creative_v2.user_video_preferences (
  user_id,
  video_content_id,
  preference_type,
  created_at
)
SELECT
  ul.user_id,
  ul.video_id,
  'like',
  COALESCE(ul.created_at, CURRENT_TIMESTAMP)
FROM hotel_creative.user_likes ul;

INSERT INTO hotel_creative_v2.industry_snapshots (
  id,
  industry_name,
  snapshot_date,
  heat_level,
  total_exposure_count,
  exposure_trend_pct,
  douyin_exposure_count,
  xiaohongshu_exposure_count,
  engagement_rate_pct,
  engagement_trend_pct,
  douyin_engagement_pct,
  xiaohongshu_engagement_pct,
  video_content_pct,
  image_content_pct,
  total_content_count,
  created_at,
  updated_at
)
SELECT
  im.id,
  im.industry_name,
  COALESCE(DATE(im.updated_at), CURRENT_DATE),
  im.heat_level,
  hotel_creative_v2.fn_parse_count(im.total_exposure),
  hotel_creative_v2.fn_parse_percent(im.exposure_trend),
  hotel_creative_v2.fn_parse_count(im.douyin_exposure),
  hotel_creative_v2.fn_parse_count(im.xhs_exposure),
  hotel_creative_v2.fn_parse_percent(im.engagement_rate),
  hotel_creative_v2.fn_parse_percent(im.engagement_trend),
  hotel_creative_v2.fn_parse_percent(im.douyin_engagement),
  hotel_creative_v2.fn_parse_percent(im.xhs_engagement),
  CAST(im.video_pct AS DECIMAL(5,2)),
  CAST(im.image_pct AS DECIMAL(5,2)),
  hotel_creative_v2.fn_parse_count(im.total_content),
  COALESCE(im.updated_at, CURRENT_TIMESTAMP),
  COALESCE(im.updated_at, CURRENT_TIMESTAMP)
FROM hotel_creative.industry_metrics im;

INSERT INTO hotel_creative_v2.industry_region_rankings (
  industry_snapshot_id,
  rank_no,
  region_name,
  description,
  score_pct,
  color_token,
  created_at
)
SELECT
  rr.metric_id,
  rr.rank_num,
  rr.name,
  rr.description,
  hotel_creative_v2.fn_parse_percent(rr.score),
  rr.color,
  CURRENT_TIMESTAMP
FROM hotel_creative.region_rankings rr;

INSERT INTO hotel_creative_v2.industry_hot_topics (
  industry_snapshot_id,
  topic_title,
  heat_count,
  display_size,
  color_token,
  created_at
)
SELECT
  htt.metric_id,
  htt.title,
  hotel_creative_v2.fn_parse_count(htt.heat),
  CASE
    WHEN htt.size IN ('small', 'medium', 'large') THEN htt.size
    ELSE 'small'
  END,
  htt.color,
  CURRENT_TIMESTAMP
FROM hotel_creative.hot_topic_tags htt;

INSERT INTO hotel_creative_v2.user_calendar_entries (
  id,
  user_id,
  entry_date,
  title,
  time_hint,
  day_label,
  image_url,
  description,
  status,
  created_at,
  updated_at
)
SELECT
  ce.id,
  ce.user_id,
  ce.entry_date,
  ce.title,
  ce.time_hint,
  ce.day_label,
  ce.img_src,
  ce.description,
  'planned',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM hotel_creative.calendar_entries ce;

INSERT INTO hotel_creative_v2.user_inspirations (
  id,
  user_id,
  image_url,
  alt_text,
  source_url,
  source_platform,
  created_at,
  updated_at
)
SELECT
  si.id,
  si.user_id,
  si.img_src,
  COALESCE(si.alt_text, ''),
  NULL,
  NULL,
  COALESCE(si.created_at, CURRENT_TIMESTAMP),
  COALESCE(si.created_at, CURRENT_TIMESTAMP)
FROM hotel_creative.saved_inspirations si;

INSERT INTO hotel_creative_v2.ai_generated_assets (
  id,
  user_id,
  title,
  description,
  asset_type,
  image_url,
  prompt_text,
  generation_model,
  status,
  created_at,
  updated_at
)
SELECT
  aw.id,
  aw.user_id,
  aw.title,
  aw.description,
  'image',
  aw.img_src,
  NULL,
  NULL,
  'ready',
  COALESCE(aw.created_at, CURRENT_TIMESTAMP),
  COALESCE(aw.created_at, CURRENT_TIMESTAMP)
FROM hotel_creative.ai_works aw;

INSERT INTO hotel_creative_v2.marketing_analysis_snapshots (
  id,
  user_id,
  snapshot_date,
  social_influence_score,
  social_trend_pct,
  engagement_rate_pct,
  engagement_trend_pct,
  follower_growth_pct,
  follower_trend_pct,
  content_quality_score,
  quality_trend_pct,
  analysis_summary,
  created_at,
  updated_at
)
SELECT
  ma.id,
  ma.user_id,
  COALESCE(DATE(ma.created_at), CURRENT_DATE),
  hotel_creative_v2.fn_parse_score(ma.social_influence),
  hotel_creative_v2.fn_parse_percent(ma.social_trend),
  hotel_creative_v2.fn_parse_percent(ma.engagement_rate),
  hotel_creative_v2.fn_parse_percent(ma.engagement_trend),
  hotel_creative_v2.fn_parse_percent(ma.follower_growth),
  hotel_creative_v2.fn_parse_percent(ma.follower_trend),
  hotel_creative_v2.fn_parse_score(ma.content_quality),
  hotel_creative_v2.fn_parse_percent(ma.quality_trend),
  ma.analysis_summary,
  COALESCE(ma.created_at, CURRENT_TIMESTAMP),
  COALESCE(ma.created_at, CURRENT_TIMESTAMP)
FROM hotel_creative.marketing_analysis ma;

INSERT INTO hotel_creative_v2.marketing_reports (
  id,
  user_id,
  title,
  report_date,
  report_type,
  status,
  view_count,
  content,
  created_at,
  updated_at
)
SELECT
  mr.id,
  mr.user_id,
  mr.title,
  mr.report_date,
  'analysis',
  CASE
    WHEN mr.status IN ('draft', 'completed', 'archived') THEN mr.status
    ELSE 'draft'
  END,
  COALESCE(mr.views, 0),
  mr.content,
  COALESCE(mr.created_at, CURRENT_TIMESTAMP),
  COALESCE(mr.created_at, CURRENT_TIMESTAMP)
FROM hotel_creative.marketing_reports mr;

COMMIT;

-- Optional cleanup after verification:
-- DROP FUNCTION IF EXISTS hotel_creative_v2.fn_parse_count;
-- DROP FUNCTION IF EXISTS hotel_creative_v2.fn_parse_percent;
-- DROP FUNCTION IF EXISTS hotel_creative_v2.fn_parse_score;
-- DROP FUNCTION IF EXISTS hotel_creative_v2.fn_map_platform;
-- DROP FUNCTION IF EXISTS hotel_creative_v2.fn_map_content_type;
