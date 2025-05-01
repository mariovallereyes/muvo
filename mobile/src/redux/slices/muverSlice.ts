import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  level: '',
  points: 0,
  salesPersonal: 0,
  salesTeam: 0,
  loading: false,
  error: null
};

const muverSlice = createSlice({
  name: 'muver',
  initialState,
  reducers: {
    setMuverData: (state, action) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setMuverData, setLoading, setError } = muverSlice.actions;
export default muverSlice.reducer;