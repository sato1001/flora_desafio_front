import { getSessionToken } from '@/lib/auth/session';

const BASE_URL = process.env.NEXT_API_URL || 'http://localhost:3000';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getSessionToken();
  const headers = new Headers(options.headers);

  if (token && !headers.has('Authorization')) {
    // If the token already has Bearer prefix, use it, otherwise prefix it
    const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    headers.set('Authorization', authHeader);
  }

  if (options.body && !headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      errorMsg = response.statusText || errorMsg;
    }

    // If 401 Unauthorized, automatically redirect to login in browser environments
    if (response.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    throw new Error(errorMsg);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
