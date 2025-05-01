import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MuverState {
  team: any[] | null;
  commissions: any[] | null;
  events: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: MuverState = {
  team: null,
  commissions: null,
  events: null,
  loading: false,
  error: null,
};

export const muverSlice = createSlice({
  name: 'muver',
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<any[] | null>) => {
      state.team = action.payload;
    },
    setCommissions: (state, action: PayloadAction<any[] | null>) => {
      state.commissions = action.payload;
    },
    setEvents: (state, action: PayloadAction<any[] | null>) => {
      state.events = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMuverData: (state) => {
      state.team = null;
      state.commissions = null;
      state.events = null;
      state.error = null;
    },
  },
});

export const {
  setTeam,
  setCommissions,
  setEvents,
  setLoading,
  setError,
  clearMuverData
} = muverSlice.actions;

export default muverSlice.reducer;