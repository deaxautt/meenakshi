import { createContext, useContext, useState, useEffect } from 'react';
import { handleSignIn, handleSignUp, handleGetUser } from '../lib/api';

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  mobile?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, mobile?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userId = localStorage.getItem('userId');
          if (userId) {
            const user = await handleGetUser(userId);
            if (user) {
              setUser(user);
            } else {
              // Invalid session, clear it
              localStorage.removeItem('authToken');
              localStorage.removeItem('userId');
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user, token, error } = await handleSignIn(email, password);
      
      if (error) {
        throw new Error(error);
      }

      if (user && token) {
        // Store session
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
        setUser(user);
      }

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('An error occurred') };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, mobile?: string) => {
    try {
      const { user, token, error } = await handleSignUp(email, password, fullName, mobile);
      
      if (error) {
        throw new Error(error);
      }

      if (user && token) {
        // Store session
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
        setUser(user);
      }

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('An error occurred') };
    }
  };

  const signOut = async () => {
    // Clear session
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setUser(null);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}