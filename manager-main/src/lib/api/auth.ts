import { apiClient, type ApiResponse } from '../api-client';

export type User = {
  id: number;
  username: string;
  nickname?: string;
  hotelName?: string | null;
};

type AuthPayload = {
  token: string;
  user: User;
};

export function login(input: { username: string; password: string }) {
  return apiClient.post<AuthPayload>('/auth/login', input, { skipAuth: true });
}

export function register(input: {
  username: string;
  password: string;
  nickname?: string;
  hotel_name?: string;
}) {
  return apiClient.post<AuthPayload>('/auth/register', input, { skipAuth: true });
}

export function getMe() {
  return apiClient.get<ApiResponse<User>>('/auth/me');
}
