// Static app catalog (no DB table needed for this demo)
const appCatalog = [
  {
    id: 'product-photo',
    title: '产品图生成',
    description: '利用AI技术一键生成高品质产品展示图',
    icon: 'photo_camera',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'material-optimize',
    title: '素材优化',
    description: '智能调整素材的色彩、构图和画质',
    icon: 'auto_fix_high',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'smart-topic',
    title: '智能选题',
    description: '基于热点和数据分析推荐最佳内容选题',
    icon: 'lightbulb',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'copy-optimize',
    title: '文案优化',
    description: '用AI润色和优化营销文案，提升转化率',
    icon: 'edit_note',
    color: 'from-green-500 to-teal-500',
  },
];

exports.list = async (_req, res) => {
  res.json({ data: appCatalog });
};

exports.recent = async (req, res) => {
  // For demo: return static recent apps
  res.json({
    data: [
      { id: 'product-photo', title: '产品图生成', usedAt: '2小时前' },
      { id: 'smart-topic', title: '智能选题', usedAt: '昨天' },
      { id: 'copy-optimize', title: '文案优化', usedAt: '3天前' },
    ],
  });
};
