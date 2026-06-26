import { apiFetch } from './client';
import { EntryListResponse, WordDetail } from '../types/api';

export interface ListEntriesParams {
  search?: string;
  limit?: number;
  page?: number;
  cursor?: string;
}

export async function listEntries(params: ListEntriesParams = {}): Promise<EntryListResponse> {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.limit !== undefined) query.append('limit', String(params.limit));
  
  // page and cursor are mutually exclusive based on backend requirements
  if (params.cursor) {
    query.append('cursor', params.cursor);
  } else if (params.page !== undefined) {
    query.append('page', String(params.page));
  }

  const queryString = query.toString();
  const endpoint = `/entries/en${queryString ? `?${queryString}` : ''}`;
  return apiFetch<EntryListResponse>(endpoint);
}

export async function getEntry(word: string, options: RequestInit = {}): Promise<WordDetail> {
  // Use encodeURIComponent to handle words with special characters safely
  return apiFetch<WordDetail>(`/entries/en/${encodeURIComponent(word)}`, options);
}

export async function favoriteWord(word: string): Promise<void> {
  return apiFetch<void>(`/entries/en/${encodeURIComponent(word)}/favorite`, {
    method: 'POST',
  });
}

export async function unfavoriteWord(word: string): Promise<void> {
  return apiFetch<void>(`/entries/en/${encodeURIComponent(word)}/unfavorite`, {
    method: 'DELETE',
  });
}
