import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export type UserRole = 'client' | 'artisan';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  specialty?: string;
  avatar?: string;
  level?: string;
  rankingScore?: number;
  available?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  isClient: () => boolean;
  isArtisan: () => boolean;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  login: (token, user) => {
    set({ token, user, isAuthenticated: !!user });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ token: null, user: null, isAuthenticated: false });
  },

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  isClient: () => get().user?.role === 'client',
  isArtisan: () => get().user?.role === 'artisan',

  initialize: async () => {
    // 1. Get current session
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      // 2. Fetch full profile to get role and extra data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        // Adapt profiles table schema to frontend2 User interface
        // frontend2 treats 'worker' as 'artisan'
        const normalizedRole = profile.role === 'worker' ? 'artisan' : profile.role;

        const currentUser: User = {
          id: profile.id,
          name: profile.full_name || 'Utilisateur',
          email: profile.email || session.user.email || '',
          role: normalizedRole as UserRole,
          phone: profile.phone,
          city: profile.city || undefined,
        };

        set({
          token: session.access_token,
          user: currentUser,
          isAuthenticated: true,
          isInitialized: true
        });
      } else {
        set({ isInitialized: true });
      }
    } else {
      set({ isInitialized: true, isAuthenticated: false, user: null, token: null });
    }

    // 3. Listen for changes (login, logout, token refresh)
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        set({ token: null, user: null, isAuthenticated: false });
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const normalizedRole = profile.role === 'worker' ? 'artisan' : profile.role;
          const currentUser: User = {
            id: profile.id,
            name: profile.full_name || 'Utilisateur',
            email: profile.email || session.user.email || '',
            role: normalizedRole as UserRole,
            phone: profile.phone,
            city: profile.city || undefined,
          };
          set({ token: session.access_token, user: currentUser, isAuthenticated: true });
        }
      }
    });
  },
}));
