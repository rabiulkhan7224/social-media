'use client';

import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (provider: 'google' | 'github' | 'email', options?: any) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch session on mount
  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    setIsLoading(true);
    try {
      const { data: sessionData, error } = await authClient.getSession();
      
      if (error) {
        console.error('Session error:', error);
        setUser(null);
        setSession(null);
      } else if (sessionData) {
        setUser(sessionData.user);
        setSession(sessionData);
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (provider: 'google' | 'github' | 'email', options?: any) => {
    try {
      if (provider === 'email') {
        await authClient.signIn.email(options);
      } else {
        await authClient.signIn.social({
          provider,
          callbackURL: options?.callbackURL || '/dashboard',
        });
      }
      await fetchSession(); // Refresh session after sign in
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      setSession(null);
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const refreshSession = async () => {
    await fetchSession();
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      // Call your API to update user
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setUser((prev) => prev ? { ...prev, ...data } : null);
        await refreshSession();
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    refreshSession,
    updateUser,
  };
}