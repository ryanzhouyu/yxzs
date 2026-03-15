export type TopicCardData = {
  title: string;
  type: string;
  duration: string;
  description: string;
  imgSrc: string;
  isFirst: boolean;
};

export const topicCards: TopicCardData[] = [
  {
    title: '同事互相吐槽，最后彼此加油',
    type: '短视频',
    duration: '30-60秒',
    description:
      '展示同事之间互相吐槽工作中的烦恼，最后互相鼓励加油，传递正能量',
    imgSrc: 'https://picsum.photos/seed/colleague-talk/600/400',
    isFirst: true,
  },
  {
    title: '打工人心情变化',
    type: '短视频',
    duration: '20-40秒',
    description: '用表情和动作展示打工人从周一到周五的心情变化',
    imgSrc: 'https://picsum.photos/seed/mood-change/600/400',
    isFirst: false,
  },
  {
    title: '老板说的 vs 实际做的',
    type: '短视频',
    duration: '25-45秒',
    description: '对比老板说的话和员工实际做的事情，制造幽默反差',
    imgSrc: 'https://picsum.photos/seed/boss-vs-real/600/400',
    isFirst: false,
  },
];
