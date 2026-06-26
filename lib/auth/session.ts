export function getSessionToken(): string | undefined {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/(?:^|; )session_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : undefined;
  }
  return undefined;
}

export function setSessionToken(token: string): void {
  if (typeof window !== 'undefined') {
    // 7 days = 604800 seconds, matches the backend's token validity of 7d
    document.cookie = `session_token=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax; Secure`;
  }
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    document.cookie = 'session_token=; path=/; max-age=0; SameSite=Lax; Secure';
  }
}
