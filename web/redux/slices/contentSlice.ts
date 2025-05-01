import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  products: any[] | null;
  articles: any[] | null;
  events: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  products: null,
  articles: null,
  events: null,
  loading: false,
  error: null,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[] | null>) => {
      state.products = action.payload;
    },
    setArticles: (state, action: PayloadAction<any[] | null>) => {
      state.articles = action.payload;
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
    clearContentData: (state) => {
      state.products = null;
      state.articles = null;
      state.events = null;
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setArticles,
  setEvents,
  setLoading,
  setError,
  clearContentData
} = contentSlice.actions;

export default contentSlice.reducer;