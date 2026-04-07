export type VideoCardData = {
  id: string;
  imgSrc: string;
  tag: string;
  title: string;
  views: string;
  rating?: string;
  likes: string;
  comments: string;
  shares: string;
  description: string;
  hashtags: string[];
};

export const videoCards: VideoCardData[] = [
  {
    id: 'office-worker',
    imgSrc: 'https://picsum.photos/seed/office-worker/1080/1920',
    tag: '创意视频',
    title: '工作日创意短片',
    views: '420',
    rating: '5.0',
    likes: '120万',
    comments: '120万',
    shares: '85万',
    description:
      '工作日创意短片主要以职场视角切入一天的工作内容，在轻松吐槽的同时，展示企业文化或服务。这类反差感叙事很容易引发年轻职场人的共鸣，从而带来二次传播。',
    hashtags: ['#职场吐槽', '#创意剧情', '#企业文化'],
  },
  {
    id: 'pro-studio',
    imgSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWSuSmsTUBDdsBbET-ifFsYiBp0Jh_up0CLozdG6CEke5qTEZ3Gm8pSBGWYzPvgI_LPr2jolz9ky9DO_t3emfLn0hEATHQe_c_-c1YNjc8sS46FceTS5ZV3xpqLcSyLSLcDnwgN2mS8yLMgYuQLicU9zBGYf7o-aBtkc31UOsWrOAy7yFSNKSrO1gT-82lQTSOcQFGKZcPwt038HoWxBeY5nj7H6QoELV7TY8Sqg-K1nfKdqv0y_WiqUQhWSOcdQK5qdCFBStCf7V',
    tag: '专业设备',
    title: '打造你的专业工作室',
    views: '10',
    rating: '4.8',
    likes: '8.5万',
    comments: '1.2万',
    shares: '3.4万',
    description:
      '从零开始打造专业工作室，涵盖设备选购、灯光布置、背景搭建等核心环节，帮助创作者快速提升内容制作质量。',
    hashtags: ['#工作室搭建', '#专业设备', '#内容制作'],
  },
  {
    id: 'creative-tutorial',
    imgSrc: 'https://picsum.photos/seed/creative-idea/1080/1920',
    tag: '创意教程',
    title: '如何拍摄创意短视频',
    views: '89',
    rating: '4.9',
    likes: '45万',
    comments: '3.2万',
    shares: '12.5万',
    description:
      '系统讲解创意短视频的策划、拍摄和后期制作技巧，从构思到成片的完整流程，适合新手快速上手。',
    hashtags: ['#拍摄技巧', '#创意教程', '#短视频制作'],
  },
  {
    id: 'marketing-trends',
    imgSrc: 'https://picsum.photos/seed/marketing/1080/1920',
    tag: '营销技巧',
    title: '社交媒体营销新趋势',
    views: '67',
    rating: '4.7',
    likes: '32万',
    comments: '2.8万',
    shares: '9.6万',
    description:
      '解析最新社交媒体营销趋势，包括短视频带货、直播互动、KOL合作等前沿玩法，助力酒店品牌增长。',
    hashtags: ['#社交营销', '#品牌增长', '#内容策略'],
  },
  {
    id: 'animation-basics',
    imgSrc: 'https://picsum.photos/seed/animation/1080/1920',
    tag: '动画制作',
    title: '零基础学动画制作',
    views: '34',
    rating: '4.6',
    likes: '18万',
    comments: '1.5万',
    shares: '6.2万',
    description:
      '零基础入门动画制作，从简单的逐帧动画到流畅的运动图形，用动画为你的营销内容增添吸引力。',
    hashtags: ['#动画制作', '#零基础', '#运动图形'],
  },
];
