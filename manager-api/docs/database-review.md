# 数据库设计审查与增强建议

## 结论

当前数据库设计适合 Demo 和静态内容展示，基础关系是通的，但如果要支持真实运营、统计分析和后续扩展，还需要补齐数值字段、唯一约束、时间维度和查询索引。

本目录新增的 [011_harden_schema.sql](/d:/yxzs/yxzs/manager-api/migrations/011_harden_schema.sql) 采用的是“增量增强”思路：

- 保留现有展示字段，避免现有接口立即失效
- 为统计类字段补充可计算的数值列
- 为高频查询补索引
- 为关系表补唯一约束
- 为分析类表补快照时间字段

## 当前设计的优点

- 主体表之间已经有外键关系，删除级联逻辑清晰
- `user_likes` 已经通过唯一键避免重复点赞
- `video_trends` 已经通过 `(video_id, date)` 保证日趋势唯一
- 用户、视频、创作、营销、热点几个业务域已经初步拆开

## 主要问题

### 1. 展示值和统计值混存

当前很多字段直接存了展示文案，例如：

- `videos.views`
- `videos.likes`
- `hot_contents.heat`
- `industry_metrics.total_exposure`
- `marketing_analysis.social_influence`

这类字段如果直接存 `1.2M`、`98%`、`85/100`，会导致：

- 无法正确排序
- 无法做范围筛选
- 无法做同比环比
- 无法安全聚合

建议：

- 保留原有展示字段给前端兼容
- 新增数值字段作为唯一事实来源
- 展示文案由前端或服务端格式化生成

### 2. 点赞存在双写风险

`videos.like_count` 才应该是聚合结果，而用户是否点过赞应以 `user_likes` 为准。当前项目里用户点赞操作只写 `user_likes`，没有同步更新视频表中的点赞展示值。

建议：

- 短期：保留展示字段，但统一从数值列或聚合结果出数
- 中期：把 `videos.likes` 这类文本字段降级为兼容字段
- 长期：所有互动数统一使用数值列

### 3. 关系表缺少业务唯一约束

当前以下表容易插入重复数据：

- `video_hashtags`
- `topics`
- `saved_inspirations`
- `calendar_entries`
- `hot_topic_tags`

建议补充：

- `video_hashtags (video_id, tag)`
- `topics (video_id, sort_order)`
- `saved_inspirations (user_id, img_src)`
- `calendar_entries (user_id, entry_date, title)`
- `hot_topic_tags (metric_id, title)`

### 4. 缺少时间维度

热点和营销分析本质上是“快照”数据，如果没有 `snapshot_date` 或统计周期字段，后续无法支持：

- 某天的数据回溯
- 周/月趋势对比
- 多版本分析结果并存

建议至少增加：

- `industry_metrics.snapshot_date`
- `region_rankings.snapshot_date`
- `hot_topic_tags.snapshot_date`
- `marketing_analysis.snapshot_date`

### 5. 常用查询缺少索引

当前接口大量使用如下查询方式：

- 按 `user_id + created_at`
- 按 `user_id + report_date`
- 按 `video_id + sort_order`
- 按 `video_id + platform + type`

如果数据量上来，没有对应索引会明显拖慢接口。

## 新迁移包含的增强项

### 视频域

- `videos` 新增：
  - `view_count`
  - `rating_value`
  - `like_count`
  - `comment_count`
  - `share_count`
  - `bookmark_count`
- `video_hashtags` 增加唯一约束 `(video_id, tag)`
- `hot_contents` 新增：
  - `view_count`
  - `heat_score`
  - 索引 `(video_id, platform, type)`
- `topics` 增加：
  - 唯一约束 `(video_id, sort_order)`
  - 索引 `(video_id, sort_order)`

### 热点域

- `industry_metrics` 新增：
  - `snapshot_date`
  - 曝光量/互动率相关数值列
  - 索引 `(industry_name, snapshot_date)`
- `region_rankings` 新增：
  - `snapshot_date`
  - `score_pct`
  - 唯一约束 `(metric_id, rank_num)`
- `hot_topic_tags` 新增：
  - `snapshot_date`
  - `heat_count`
  - 唯一约束 `(metric_id, title)`

### 创作域

- `saved_inspirations` 增加唯一约束 `(user_id, img_src(191))`
- `saved_inspirations` 增加索引 `(user_id, created_at)`
- `ai_works` 增加 `updated_at`
- `ai_works` 增加索引 `(user_id, created_at)`
- `calendar_entries` 增加：
  - `created_at`
  - `updated_at`
  - 唯一约束 `(user_id, entry_date, title(100))`
  - 索引 `(user_id, entry_date)`

### 营销域

- `marketing_analysis` 新增：
  - `snapshot_date`
  - 各类评分/趋势的数值列
  - 索引 `(user_id, created_at)`
  - 索引 `(user_id, snapshot_date)`
- `marketing_reports` 增加：
  - `updated_at`
  - 索引 `(user_id, report_date)`

## 落地建议

### 第一阶段

- 先执行 `011_harden_schema.sql`
- 现有接口继续跑，先不改前端字段

### 第二阶段

- 在写入逻辑中开始维护新的数值列
- 查询接口逐步改为优先返回数值列格式化后的结果

### 第三阶段

- 清理旧的展示型数字字段
- 统一所有统计口径
- 补充后台管理端的数据维护能力

## 注意事项

- 新增唯一约束前，需要确认线上不存在重复数据
- 如果数据库版本较老，某些 `ALTER TABLE ... ADD CONSTRAINT` 的执行行为需要先在测试库验证
- 当前迁移没有做旧展示字段到新数值字段的数据清洗，因为种子数据里很多是中文展示文案，不能安全自动转换

## 下一步建议

如果你想继续推进，我建议下一步做其中一个：

1. 修改后端接口，开始真正使用新增的数值列
2. 我再帮你补一版“从现有种子数据清洗到新数值列”的初始化脚本
3. 继续往前走，把整套数据库重构成更规范的正式版建表 SQL
