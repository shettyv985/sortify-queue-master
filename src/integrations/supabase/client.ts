
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wvzeiqipwfnvpijqcpsf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2emVpcWlwd2ZudnBpanFjcHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTU4NjYsImV4cCI6MjA1NzI5MTg2Nn0.wLbHtpzeMuIVZAcyvwIEdMsockzQcN8Xd69Ly6x8j84";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);
