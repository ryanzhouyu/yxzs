import { apiClient, type ApiResponse } from '../api-client';

export type HotspotResponse = {
  metrics: {
    industryName: string;
    heatLevel: string;
    totalExposure: string;
    exposureTrend: string;
    douyinExposure: string;
    xiaohongshuExposure: string;
    engagementRate: string;
    engagementTrend: string;
    douyinEngagement: string;
    xiaohongshuEngagement: string;
    videoContentRate: string;
    imageContentRate: string;
    totalContent: string;
  };
  regions: Array<{
    rank: number;
    name: string;
    desc: string;
    score: string;
    color: string;
  }>;
  hotTopics: Array<{
    title: string;
    heat: string;
    size: 'large' | 'medium' | 'small';
    color: string;
  }>;
  trendTags: string[];
};

export function getHotspots() {
  return apiClient.get<ApiResponse<HotspotResponse>>('/hotspots');
}
