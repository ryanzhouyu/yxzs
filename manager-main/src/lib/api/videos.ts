import { apiClient, type ApiResponse } from '../api-client';

export type VideoListItem = {
  id: number;
  slug: string;
  imgSrc: string;
  tag: string;
  title: string;
  views: string;
  rating?: string | null;
  likes: string;
  comments: string;
  shares: string;
  bookmarks?: string;
  description: string;
  hashtags: string[];
  liked: boolean;
};

export type VideoDetail = VideoListItem & {
  trends: Array<{
    date: string;
    views?: string;
    likes?: string;
    comments?: string;
    shares?: string;
  }>;
  hotContents: Array<{
    id: number;
    platform: string;
    type: string;
    views: string;
    heat: string;
    title: string;
    imgSrc: string;
  }>;
};

export type Topic = {
  title: string;
  type: string;
  duration: string;
  description: string;
  imgSrc: string;
  isFirst: boolean;
};

export function getVideos(page = 1, pageSize = 20) {
  return apiClient.get<ApiResponse<VideoListItem[]>>(`/videos?page=${page}&pageSize=${pageSize}`);
}

export function getVideoBySlug(slug: string) {
  return apiClient.get<ApiResponse<VideoDetail>>(`/videos/${slug}`);
}

export function getVideoTopics(slug: string) {
  return apiClient.get<ApiResponse<Topic[]>>(`/videos/${slug}/topics`);
}

export function toggleVideoLike(slug: string) {
  return apiClient.post<{ liked: boolean }>(`/videos/${slug}/like`);
}
