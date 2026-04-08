-- Marketing analysis for demo user (user_id=1)
INSERT INTO marketing_analysis (user_id, social_influence, social_trend, engagement_rate, engagement_trend, follower_growth, follower_trend, content_quality, quality_trend, analysis_summary) VALUES
(1, '85/100', '+12%', '7.2%', '-0.8%', '24%', '+5.3%', '88/100', '+3.1%', '您的社交媒体表现总体良好。社交影响力和内容质量保持上升趋势，但互动率略有下降，建议增加互动性内容。粉丝增长稳健，可继续保持当前的内容策略。');

-- Marketing reports
INSERT INTO marketing_reports (user_id, title, report_date, status, views) VALUES
(1, '3月社交媒体运营分析', '2026-03-10', 'completed', 128),
(1, '2月营销策略优化', '2026-02-15', 'completed', 96),
(1, '1月内容规划报告', '2026-01-20', 'completed', 84);

-- Calendar entries for demo user
INSERT INTO calendar_entries (user_id, entry_date, day_label, title, time_hint, img_src) VALUES
(1, CURDATE(), '周一', '精致午后时光', '14:00', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2gp815mqjP-X_9PD7VdR5Xt4PLfEHKvSOMKtGxRPf4-qdKxxOJUwJOhe6CxFZumgFkCB1zHjcwG66Kb-pnCPMyTPTRdCA6PsW7JD6mBd4IcC6e12xCeFiDTWjXRHsp2RLmDr9Jh8cElB2o9mnsQoDbC8AZumOWwgWkSybvt-ca8qrVbamyKWLzwNuuiO12JQI_pqijoQrofHvxw24W53qEjXVxCeAmoagjnV6kmDY4k7aW_juKIJBKdr83bfU94Hz_fPYIGoWFPMt'),
(1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '周二', '舒适下午体验', '10:00', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmKje1aClEYxmuTgtGb62GBTUTzuIw_TNPUHLRZvx52LXqCFKi2VtOYBRRU4xUz744f0WBSYJhkf8UcDwkZJ3kI6rcXGC7xjUrDwlU_0jt4TbLgp4xdwKECsJYZXqGQem9sdWBOcD1Fbf1obAsAQkFt890uuWzFw3A6NsmQ2p6J6PhhA1dhr_EkAKrBnKPgVDUN1CMk8BdFkdGDUBnZjAvkOWuiO7hu89Xk4lKgkwCepLkJf3O7V-GAbFa93Yn6ahC0dDYBtjmaGKV');

-- Saved inspirations for demo user
INSERT INTO saved_inspirations (user_id, img_src, alt_text) VALUES
(1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbUbBua0qfPRYN8a13JDOnhVeUWORVH3TG2IjRQmCX9tqR-oX3-qLIjSXEwRldogTrl97AO3DPezNVfaMEaUHr9IosHslvhyxiNnfIzrc9oNqhnXD2E2ZH0Le6OGqjQP6Sql9zbAh3mbU-yKH1eVAQkF_CCC9ewSafC3U7tQIIcgSgStrhOCzShE7pHib8Hxp8JYnkfftUpg8krvzDC_8XOtezeqhEln4MuAMXa8MYjOUmgHxHkrubfT85_uYq1PO7NIpy0qCjpH7_', '灵感收藏1'),
(1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUhInN1E0P7WqsaWiuNxlIRn7m4T2a0fjNXwNxGOf6jpaS0S6CSLcsCzFWw08IlCk1X4A2ij6K_8Gx_JnU2GF5qp061g8bn8rldFjssaT7_aga-qY4sXnZGyV_OYQ8i-I87vNT0viRiOrcSxnLJhNIpu2ZFfKNmWHesryLgKeXjbq2gbOL9JjDVYbLqj0NZdD8sTj_stJlkbfT-g79qgAxo_I1gMSpI86wotIsDg-4G-BM91yLlSgQ_7NFxXjOD5duL2VjHxVrlkTg', '灵感收藏2'),
(1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwRrsMTpHmSb-tNgbLWBt-Cgcp-q6-oa_jS2xfPRCGXPz0SirT6oFfxAfS4Qf4RlfFItCoeSOJfiHK265-rkcXZ2cqLY8gZe5Yt6Nfql3_wc3nDbpWp3D9DjH6gfrPC0NThB2M5bk-GS3qcp1_W2Jdjx_DmkjaooABPo2b40U1wF8dTHHppesLjtAqsvAKsDff6qD9HkzqhsovB9Zw6Fx9PlFNEHydsWjp26oMqlqsQQbxUYLOtXvdH9AqlYdACcaI-OGZhHZXp13E', '灵感收藏3');

-- AI works for demo user
INSERT INTO ai_works (user_id, title, description, img_src) VALUES
(1, '夏季推广文案 #1', '探讨城市绿洲的宁静，结合行政酒店的奢华体验...', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXmjL5JnMRAhHwb5dRg0_8VAVQjQ0kqnWmDFKbk58cPSJ-Os49rhSHkD2Qgm9oeXHL0BXolWc9U7ngKJMiDkMF0jYU2qAT1pImSiahfb9Ylx1ViEZVHDoOsHEsOaB2CobbILTP9UTJOnr7xUWOpXaE0UmsEhOcx_BJ_N7UntK4EDdyYeukhuzPU0ASf9T_GBu0vimNnoZRgZlwvxa-J9-Epir4yksOzf5awdXW1BSMveexQefN7q4E4JFTkP79mx06Np2uicjapfLG'),
(1, '活力健身周计划', '通过 AI 优化的高清海报，展示顶级运动设施...', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJVx-BNjwDolkNBi4gxx_zkUa_ukd5TMXdIwdjvON3-fiwnCrjzaZ8xUvhzyZfqjU-GOgq4rnamealyKZbWser2n668lplw75w9Eft-m6EV5R0CwpmNHcFEMpIUDNUZrUaj9zwsbxQst7Esw7vRPm_8qxqs_Fz1W8X95m0tN29bgD3k8lnOMmXOwNsTpRWWbBAGpbnai4mDCcNXKLhI-qsNZTogWl9UytAhzDeyBIxuTQCLAaTwFeiJcz0RCQaJx5PfMiYPTOm6qJY');
