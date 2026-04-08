# Database Schema V2

## 目标

这是一版面向正式业务的 MySQL 建表方案，重点解决当前 Demo 结构里的几个问题：

- 展示值和统计值混在一起
- 互动行为和聚合结果口径不统一
- 热点和营销分析缺少快照时间
- 多个关系表缺少唯一约束
- 高频查询索引不足

完整 SQL 在 [schema-v2.sql](/d:/yxzs/yxzs/manager-api/docs/schema-v2.sql)。

## 设计原则

1. 可计算指标全部使用数值字段。
2. 展示文案不作为核心统计字段保存。
3. 行为表与聚合表分离。
4. 分析类数据按快照存储。
5. 通过唯一键和枚举约束减少脏数据。

## 业务域拆分

### 用户域

- `users`

用途：
- 账号资料
- 登录态相关状态

补充点：
- 增加 `status`
- 增加 `last_login_at`

### 视频内容域

- `video_contents`
- `video_content_tags`
- `video_daily_metrics`
- `video_hotspot_references`
- `video_topic_steps`
- `user_video_preferences`

设计说明：
- `video_contents` 只保留内容主信息和聚合统计
- 标签拆到 `video_content_tags`
- 趋势统计拆到 `video_daily_metrics`
- 热门参考内容拆到 `video_hotspot_references`
- 教程步骤拆到 `video_topic_steps`
- 用户点赞/收藏统一放到 `user_video_preferences`

这样做的好处：
- 统计口径更清晰
- 一个表只负责一种信息
- 后续加“收藏”“稍后再看”都比较容易

### 行业热点域

- `industry_snapshots`
- `industry_region_rankings`
- `industry_hot_topics`

设计说明：
- 这一块本质是按日期生成的行业快照
- 所有排名、热词都挂在某个快照下面
- 支持按天回看和趋势分析

### 用户创作域

- `user_calendar_entries`
- `user_inspirations`
- `ai_generated_assets`

设计说明：
- 日历项有自己的状态字段，便于排期管理
- 灵感图支持来源字段，方便后续去重和追溯
- AI 产物支持模型、提示词、产物类型，方便后续做生成记录

### 营销分析域

- `marketing_analysis_snapshots`
- `marketing_reports`

设计说明：
- 营销分析按快照落库，不再只保留“最新一条”
- 报告表只承担报告元数据和正文
- 如果后面要支持报告附件，可以再拆子表

## 和当前版本的主要差异

### 1. 数值字段规范化

旧版大量字段是：

- `views = '1.2M'`
- `heat = '98%'`
- `social_influence = '85/100'`

V2 改成：

- `view_count BIGINT`
- `heat_score DECIMAL`
- `social_influence_score DECIMAL`

展示格式交给接口层或前端处理。

### 2. 点赞和收藏统一建模

旧版只有 `user_likes`。

V2 用 `user_video_preferences`，通过 `preference_type` 区分：

- `like`
- `bookmark`

如果后面还要加其他行为，也容易扩展。

### 3. 快照表统一化

以下数据都带明确时间维度：

- `industry_snapshots.snapshot_date`
- `marketing_analysis_snapshots.snapshot_date`
- `video_daily_metrics.metric_date`

这样才能支持：

- 历史回看
- 环比同比
- 图表趋势

### 4. 状态字段标准化

V2 里的多个表增加了枚举状态，例如：

- `users.status`
- `video_contents.status`
- `user_calendar_entries.status`
- `ai_generated_assets.status`
- `marketing_reports.status`

这样可以减少自由文本导致的数据不一致。

## 迁移建议

### 方案 A

新环境直接使用 V2 建表。

适用场景：
- 还没有正式上线
- 现有数据不重要或可重建

### 方案 B

保留现网库，分阶段迁移到 V2。

建议顺序：

1. 先创建 V2 新表
2. 从旧表回填数据到新表
3. 改接口读写到新表
4. 完成验证后下线旧表

### 方案 C

保留现有主表名，只吸收 V2 设计思想做定向改造。

适用场景：
- 现有接口已经较多
- 不想做大规模代码改动

## 我建议你怎么选

如果这是准备继续长期做的项目，我建议走 `方案 B`：

- 风险比直接替换小
- 可以边迁移边验证
- 更适合当前这个项目状态

## 下一步

如果你要继续，我可以直接帮你做下面任意一个：

1. 按这份 V2 方案生成“旧表到新表”的数据迁移脚本
2. 直接把后端接口改成兼容 V2 表结构
3. 再补一份 ER 关系说明和字段字典
