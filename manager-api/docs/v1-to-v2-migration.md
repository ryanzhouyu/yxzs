# V1 To V2 Migration

## 目标

把当前旧库 `hotel_creative` 的数据迁移到新库 `hotel_creative_v2`，并落到 V2 表结构中。

相关文件：

- [schema-v2.sql](/d:/yxzs/yxzs/manager-api/docs/schema-v2.sql)
- [v1-to-v2-migration.sql](/d:/yxzs/yxzs/manager-api/docs/v1-to-v2-migration.sql)

## 推荐迁移方式

建议采用“双库迁移”：

1. 保留旧库 `hotel_creative`
2. 新建目标库 `hotel_creative_v2`
3. 在新库执行 V2 建表 SQL
4. 再执行数据迁移 SQL
5. 验证通过后再切换应用读写

这样做的好处：

- 旧库可以随时回滚
- 不会和现有表名冲突
- 更适合逐步验证接口

## 执行顺序

### 1. 创建新库

```sql
CREATE DATABASE IF NOT EXISTS hotel_creative_v2
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
```

### 2. 在新库执行 V2 建表

执行 [schema-v2.sql](/d:/yxzs/yxzs/manager-api/docs/schema-v2.sql)。

### 3. 执行迁移脚本

执行 [v1-to-v2-migration.sql](/d:/yxzs/yxzs/manager-api/docs/v1-to-v2-migration.sql)。

## 映射关系

### 用户域

- `users -> users`

映射说明：

- 保留原主键 `id`
- 新增字段 `status = 'active'`
- `last_login_at` 先置空

### 视频内容域

- `videos -> video_contents`
- `video_hashtags -> video_content_tags`
- `video_trends -> video_daily_metrics`
- `hot_contents -> video_hotspot_references`
- `topics -> video_topic_steps`
- `user_likes -> user_video_preferences`

映射说明：

- `img_src -> cover_url`
- `tag -> primary_category`
- `rating -> avg_rating`
- `user_likes` 全部迁成 `preference_type = 'like'`
- `topics.sort_order` 不直接沿用，迁移时按 `sort_order, id` 重新生成 `step_no`

### 行业热点域

- `industry_metrics -> industry_snapshots`
- `region_rankings -> industry_region_rankings`
- `hot_topic_tags -> industry_hot_topics`

映射说明：

- `snapshot_date` 暂时取 `DATE(updated_at)`
- `xhs_*` 统一映射到 `xiaohongshu_*`
- 热词热度、曝光量、互动率都尽量转为数值型

### 用户创作域

- `calendar_entries -> user_calendar_entries`
- `saved_inspirations -> user_inspirations`
- `ai_works -> ai_generated_assets`

映射说明：

- 日历项默认状态为 `planned`
- AI 作品默认 `asset_type = 'image'`
- AI 作品默认 `status = 'ready'`

### 营销分析域

- `marketing_analysis -> marketing_analysis_snapshots`
- `marketing_reports -> marketing_reports`

映射说明：

- `snapshot_date` 暂时取 `DATE(created_at)`
- `views -> view_count`
- `report_type` 先统一写入 `analysis`

## 迁移脚本做了什么

### 1. 预置了解析函数

脚本里会创建几个辅助函数：

- `fn_parse_count`
- `fn_parse_percent`
- `fn_parse_score`
- `fn_map_platform`
- `fn_map_content_type`

用途：

- 把 `1.2M`、`98%`、`85/100` 这类旧值尽量转成正式数值
- 把平台值统一映射成 V2 枚举值
- 把内容类型统一映射成 V2 枚举值

说明：

- 为了保证 SQL 文件在当前仓库编码环境下稳定执行，脚本中的平台和内容类型映射使用了 ASCII 规则
- 如果旧库里 `platform`、`type` 实际存的是中文值，部分数据可能会先映射到 `other`
- 这类记录建议在迁移完成后抽样检查，并按真实值再做一次修正

### 2. 保留原主键

大多数表迁移时都保留了原来的 `id`，这样有两个好处：

- 便于排查
- 便于后续接口或临时兼容逻辑继续用老 ID

### 3. 优先保真，不做激进清洗

例如：

- 视频点赞数会取 `videos.likes` 和 `user_likes` 聚合中的较大值
- 视频步骤会重新生成稳定的 `step_no`
- 无法可靠转换的字段尽量回填 `NULL` 或安全默认值

## 兼容性说明

该迁移脚本依赖：

- MySQL 8.0+

原因：

- 使用了 `REGEXP_REPLACE`
- 使用了 `ROW_NUMBER() OVER (...)`

如果你当前是 MySQL 5.7，需要我再给你改一版兼容 5.7 的脚本。

## 迁移后建议校验

建议至少核对下面几项：

```sql
SELECT COUNT(*) FROM hotel_creative.users;
SELECT COUNT(*) FROM hotel_creative_v2.users;

SELECT COUNT(*) FROM hotel_creative.videos;
SELECT COUNT(*) FROM hotel_creative_v2.video_contents;

SELECT COUNT(*) FROM hotel_creative.video_hashtags;
SELECT COUNT(*) FROM hotel_creative_v2.video_content_tags;

SELECT COUNT(*) FROM hotel_creative.user_likes;
SELECT COUNT(*) FROM hotel_creative_v2.user_video_preferences WHERE preference_type = 'like';
```

再补几组 spot check：

- 随机抽 3 条视频，核对标题、封面、标签、趋势、热点引用、步骤
- 随机抽 1 个用户，核对灵感图、AI 作品、日历项、营销报告
- 检查 `industry_snapshots` 下的地区排行和热点标签是否完整

## 已知限制

- 旧数据里如果存在乱码内容，迁移会原样带过去
- 中文紧凑数值如 `12.5万` 在当前脚本里不会自动放大为正式数值，建议迁移后重点抽查
- `report_type` 目前无法从旧表精确推导，所以统一写成 `analysis`
- `calendar_entries.status` 旧表没有来源字段，因此统一写成 `planned`
- 收藏行为旧表没有单独表，所以 V2 里只迁移点赞，不迁移 `bookmark`

## 下一步建议

迁移脚本准备好后，下一步最值得做的是：

1. 先在测试库跑一次 V2 建表和数据迁移
2. 验证计数和抽样结果
3. 再改后端接口切换到 V2 读写

如果你愿意，我下一步可以直接继续帮你做“后端接口兼容 V2 表结构”的改造。
