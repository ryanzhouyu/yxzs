INSERT INTO videos (slug, img_src, tag, title, views, rating, likes, comments, shares, bookmarks, description) VALUES
('office-worker', 'https://picsum.photos/seed/office-worker/1080/1920', '创意视频', '工作日创意短片', '420', '5.0', '120万', '120万', '85万', '56万', '工作日创意短片主要以职场视角切入一天的工作内容，在轻松吐槽的同时，展示企业文化或服务。这类反差感叙事很容易引发年轻职场人的共鸣，从而带来二次传播。'),
('pro-studio', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWSuSmsTUBDdsBbET-ifFsYiBp0Jh_up0CLozdG6CEke5qTEZ3Gm8pSBGWYzPvgI_LPr2jolz9ky9DO_t3emfLn0hEATHQe_c_-c1YNjc8sS46FceTS5ZV3xpqLcSyLSLcDnwgN2mS8yLMgYuQLicU9zBGYf7o-aBtkc31UOsWrOAy7yFSNKSrO1gT-82lQTSOcQFGKZcPwt038HoWxBeY5nj7H6QoELV7TY8Sqg-K1nfKdqv0y_WiqUQhWSOcdQK5qdCFBStCf7V', '专业设备', '打造你的专业工作室', '10', '4.8', '8.5万', '1.2万', '3.4万', '2.1万', '从零开始打造专业工作室，涵盖设备选购、灯光布置、背景搭建等核心环节，帮助创作者快速提升内容制作质量。'),
('creative-tutorial', 'https://picsum.photos/seed/creative-idea/1080/1920', '创意教程', '如何拍摄创意短视频', '89', '4.9', '45万', '3.2万', '12.5万', '8.3万', '系统讲解创意短视频的策划、拍摄和后期制作技巧，从构思到成片的完整流程，适合新手快速上手。'),
('marketing-trends', 'https://picsum.photos/seed/marketing/1080/1920', '营销技巧', '社交媒体营销新趋势', '67', '4.7', '32万', '2.8万', '9.6万', '5.8万', '解析最新社交媒体营销趋势，包括短视频带货、直播互动、KOL合作等前沿玩法，助力酒店品牌增长。'),
('animation-basics', 'https://picsum.photos/seed/animation/1080/1920', '动画制作', '零基础学动画制作', '34', '4.6', '18万', '1.5万', '6.2万', '3.9万', '零基础入门动画制作，从简单的逐帧动画到流畅的运动图形，用动画为你的营销内容增添吸引力。');

-- Hashtags
INSERT INTO video_hashtags (video_id, tag) VALUES
(1, '#职场吐槽'), (1, '#创意剧情'), (1, '#企业文化'),
(2, '#工作室搭建'), (2, '#专业设备'), (2, '#内容制作'),
(3, '#拍摄技巧'), (3, '#创意教程'), (3, '#短视频制作'),
(4, '#社交营销'), (4, '#品牌增长'), (4, '#内容策略'),
(5, '#动画制作'), (5, '#零基础'), (5, '#运动图形');
