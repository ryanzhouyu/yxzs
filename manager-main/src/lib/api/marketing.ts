import { apiClient, type ApiResponse } from '../api-client';

export type AnalysisCard = {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  icon: string;
};

export type Strategy = {
  title: string;
  description: string;
  icon: string;
  tags: string[];
};

export type MarketingTopic = {
  topic: string;
  heat: string;
  match: string;
};

export type MarketingCalendarDay = {
  date: number;
  day: string;
  hasContent: boolean;
  isToday: boolean;
};

export type PublishSuggestion = {
  time: string;
  platform: string;
  type: string;
  title: string;
};

export type MarketingReport = {
  id: number | string;
  title: string;
  reportDate?: string;
  date?: string;
  status: 'draft' | 'completed';
  viewCount?: number;
  views?: string;
};

export function getMarketingAnalysis() {
  return apiClient.get<ApiResponse<{ cards: AnalysisCard[]; summary: string }>>('/marketing/analysis');
}

export function getMarketingStrategies() {
  return apiClient.get<ApiResponse<Strategy[]>>('/marketing/strategies');
}

export function getMarketingTopics() {
  return apiClient.get<ApiResponse<MarketingTopic[]>>('/marketing/hot-topics');
}

export function getMarketingCalendar() {
  return apiClient.get<ApiResponse<MarketingCalendarDay[]>>('/marketing/calendar');
}

export function getPublishSuggestions() {
  return apiClient.get<ApiResponse<PublishSuggestion[]>>('/marketing/publish-suggestions');
}

export function getMarketingReports(page = 1, pageSize = 10) {
  return apiClient.get<ApiResponse<MarketingReport[]>>(`/marketing/reports?page=${page}&pageSize=${pageSize}`);
}
