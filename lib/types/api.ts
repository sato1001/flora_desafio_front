export interface AuthResponse {
  id: string;
  name: string;
  token: string;
}

export interface UserMeResponse {
  id: string;
  name: string;
  email: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type EntryListResponse = PaginatedResponse<string>;

export interface HistoryItem {
  word: string;
  added: string;
}

export interface FavoriteItem {
  word: string;
  added: string;
}

export interface Phonetic {
  text?: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface WordDetail {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
  sourceUrls?: string[];
}
