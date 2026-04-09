import { apiClient, type ApiResponse } from '../api-client';

export type CalendarEntry = {
  id?: number;
  dayLabel?: string;
  title: string;
  timeHint?: string;
  imageUrl?: string;
};

export type Inspiration = {
  id: number;
  imgSrc?: string;
  imageUrl?: string;
  altText: string;
};

export type Work = {
  id: number;
  title: string;
  description: string;
  imgSrc?: string;
  imageUrl?: string;
  createdAt?: string;
};

export function getCreationCalendar() {
  return apiClient.get<ApiResponse<CalendarEntry[]>>('/creations/calendar');
}

export function getInspirations(page = 1, pageSize = 12) {
  return apiClient.get<ApiResponse<Inspiration[]>>(`/creations/inspirations?page=${page}&pageSize=${pageSize}`);
}

export function getWorks(page = 1, pageSize = 10) {
  return apiClient.get<ApiResponse<Work[]>>(`/creations/works?page=${page}&pageSize=${pageSize}`);
}
