import { clearToken, getToken } from './auth';

export type ApiResponse<T> = {
  data: T;
  total?: number;
  page?: number;
  pageSize?: number;
};

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  skipAuth?: boolean;
};

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (!options.skipAuth) {
    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new Error('无法连接到后端服务，请确认 manager-api 已启动');
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof payload?.error === 'string' ? payload.error : '请求失败';
    if (response.status === 401) {
      clearToken();
    }
    throw new Error(message);
  }

  return payload as T;
}

export const apiClient = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>(path, { ...options, method: 'GET' });
  },
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>(path, { ...options, method: 'POST', body });
  },
};
