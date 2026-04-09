import { apiClient, type ApiResponse } from '../api-client';

export type AppItem = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color?: string;
};

export type RecentApp = {
  id: string;
  title: string;
  usedAt: string;
};

export function getApps() {
  return apiClient.get<ApiResponse<AppItem[]>>('/apps');
}

export function getRecentApps() {
  return apiClient.get<ApiResponse<RecentApp[]>>('/apps/recent');
}
