import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
      state.loading = false;
      state.error = null;
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

export const { setArticles, setCurrentArticle, setLoading, setError } = contentSlice.actions;
export default contentSlice.reducer;