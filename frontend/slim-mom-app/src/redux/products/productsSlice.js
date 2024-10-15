import { createSlice } from '@reduxjs/toolkit';
import { listCategories, listProducts } from './operations';

const initialState = {
  products: [],
  categories: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(listCategories.pending, state => {
          state.isLoading = true;
        })
        .addCase(listCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.categories = action.payload;
        })
        .addCase(listCategories.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(listProducts.pending, state => {
            state.isLoading = true;
        })
        .addCase(listProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase(listProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
   },
});

export const productsReducer = productsSlice.reducer;