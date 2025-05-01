import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  userProfile: any | null;
  muverDetails: any | null;
  isAuthenticated: boolean;
  isMuver: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  muverDetails: null,
  isAuthenticated: false,
  isMuver: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any | null>) => {
      state.userProfile = action.payload;
    },
    setMuverDetails: (state, action: PayloadAction<any | null>) => {
      state.muverDetails = action.payload;
      state.isMuver = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userProfile = null;
      state.muverDetails = null;
      state.isAuthenticated = false;
      state.isMuver = false;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setUserProfile,
  setMuverDetails,
  setLoading,
  setError,
  logout
} = authSlice.actions;

export default authSlice.reducer;