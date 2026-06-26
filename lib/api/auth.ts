import { apiFetch } from './client';
import { AuthResponse } from '../types/api';

export interface Credentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends Credentials {
  name: string;
}

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function signin(credentials: Credentials): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}
