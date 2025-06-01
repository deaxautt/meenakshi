import { User } from './types';

interface AuthResponse {
  user: User | null;
  token: string | null;
  error: string | null;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

export async function handleSignIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleApiResponse<AuthResponse>(response);
  } catch (error) {
    return { user: null, token: null, error: error instanceof Error ? error.message : 'Failed to sign in' };
  }
}

export async function handleSignUp(
  email: string, 
  password: string, 
  fullName: string, 
  mobile?: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName, mobile }),
    });
    return handleApiResponse<AuthResponse>(response);
  } catch (error) {
    return { user: null, token: null, error: error instanceof Error ? error.message : 'Failed to sign up' };
  }
}

export async function handleGetUser(userId: string): Promise<User | null> {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return handleApiResponse<User>(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function handleUpdateUser(userId: string, updates: Partial<User>): Promise<User | null> {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates),
    });

    return handleApiResponse<User>(response);
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function handleRequestPasswordReset(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(`${API_URL}/auth/request-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleApiResponse<{ success: boolean; error: string | null }>(response);
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to request password reset' };
  }
}

export async function handleResetPassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    return handleApiResponse<{ success: boolean; error: string | null }>(response);
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to reset password' };
  }
}