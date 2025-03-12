
import { Session, User } from '@supabase/supabase-js';

export type UserProfile = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'customer' | 'user';
};

export type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string, 
    password: string, 
    role?: 'admin' | 'customer' | 'user',
    profileData?: {
      first_name?: string;
      last_name?: string;
    }
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
};
