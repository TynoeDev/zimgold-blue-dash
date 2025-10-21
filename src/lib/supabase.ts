import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.\n' +
    'Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  db: {
    schema: 'public',
  },
});

// Helper to check if user is authenticated
export const isAuthenticated = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Helper to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper to get current user profile
export const getCurrentProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};

// Helper to update user online status
export const updateOnlineStatus = async (isOnline: boolean) => {
  const user = await getCurrentUser();
  if (!user) return;

  await supabase.rpc('update_user_online_status', {
    user_uuid: user.id,
    is_online_status: isOnline,
  });
};

// Set up online status tracking
if (typeof window !== 'undefined') {
  // Update status when tab becomes active/inactive
  document.addEventListener('visibilitychange', () => {
    updateOnlineStatus(!document.hidden);
  });

  // Update status on app load
  updateOnlineStatus(true);

  // Update status to offline when closing tab
  window.addEventListener('beforeunload', () => {
    updateOnlineStatus(false);
  });
}
