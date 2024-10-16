import { createSlice } from '@reduxjs/toolkit';
import { addDiary, deleteDiary, listDiaries, setDate } from './operations';
import { Notify } from 'notiflix';
import { format } from 'date-fns';

const formattedDate = format(new Date(), 'dd.MM.yyyy');

const initialState = {
  diaries: [],
  date: formattedDate,
  isLoading: false,
  error: null,
};

const diariesSlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(listDiaries.pending, state => {
      state.isLoading = true;
    }).addCase(listDiaries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.diaries = action.payload;
    }).addCase(listDiaries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }).addCase(addDiary.pending, state => {
      state.isLoading = true;
    }).addCase(addDiary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.diaries.push(action.payload);
      Notify.success('Diary added successfully!');
    }).addCase(addDiary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }).addCase(deleteDiary.pending, state => {
      state.isLoading = true;
    }).addCase(deleteDiary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.diaries = state.diaries.filter(e => e._id !== action.payload);
      Notify.success('Diary deleted successfully!');
    }).addCase(deleteDiary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      Notify.failure('Failed to delete diary!');
    }).addCase(setDate.fulfilled, (state, action) => {
      state.date = action.payload;
    });

  },
});

export const diariesReducer = diariesSlice.reducer;