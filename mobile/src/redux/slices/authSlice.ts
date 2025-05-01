import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../../shared/supabase/client';
import { User } from '../../../../shared/models/types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunks for authentication
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        return rejectWithValue(error.message);
      }
      
      return {
        user: data.user,
        token: data.session?.access_token,
      };
    } catch (error) {
      return rejectWithValue('Credenciales incorrectas');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { email, password, username }: { email: string; password: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });
      
      if (error) {
        return rejectWithValue(error.message);
      }
      
      return {
        user: data.user,
        token: data.session?.access_token,
      };
    } catch (error) {
      return rejectWithValue('Error al registrar usuario');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return rejectWithValue(error.message);
    }
    
    return null;
  } catch (error) {
    return rejectWithValue('Error al cerrar sesión');
  }
});

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error || !data.session) {
      return rejectWithValue('No hay sesión activa');
    }
    
    return {
      user: data.session.user,
      token: data.session.access_token,
    };
  } catch (error) {
    return rejectWithValue('Error al verificar autenticación');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user as unknown as User;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user as unknown as User;
      state.token = action.payload.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Check Auth
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user as unknown as User;
      state.token = action.payload.token;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
