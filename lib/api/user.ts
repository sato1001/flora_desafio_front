import { apiFetch } from './client';
import { UserMeResponse, PaginatedResponse, HistoryItem, FavoriteItem } from '../types/api';

export interface UserListParams {
  page?: number;
  limit?: number;
}

export async function getMe(): Promise<UserMeResponse> {
  return apiFetch<UserMeResponse>('/user/me');
}

export async function getHistory(params: UserListParams = {}): Promise<PaginatedResponse<HistoryItem>> {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.append('page', String(params.page));
  if (params.limit !== undefined) query.append('limit', String(params.limit));

  const queryString = query.toString();
  const endpoint = `/user/me/history${queryString ? `?${queryString}` : ''}`;
  return apiFetch<PaginatedResponse<HistoryItem>>(endpoint);
}

export async function getFavorites(params: UserListParams = {}): Promise<PaginatedResponse<FavoriteItem>> {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.append('page', String(params.page));
  if (params.limit !== undefined) query.append('limit', String(params.limit));

  const queryString = query.toString();
  const endpoint = `/user/me/favorites${queryString ? `?${queryString}` : ''}`;
  return apiFetch<PaginatedResponse<FavoriteItem>>(endpoint);
}
