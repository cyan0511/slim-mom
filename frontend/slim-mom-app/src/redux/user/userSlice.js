import { createSlice } from '@reduxjs/toolkit'
import {
  getCurrentUser,
  calculateCalorieIntake,
} from './operations'
import { Notify } from 'notiflix'

const initialState = {
  user: {
    dailyCalorieIntake: 0,
    foodNotRecommended: [],
  },
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(calculateCalorieIntake.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(calculateCalorieIntake.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        // state.user.foodNotRecommended = action.payload.foodNotRecommended;
        state.isLoading = false
      })
      .addCase(calculateCalorieIntake.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        Notify.failure('Daily calorie intake calculator encountered an error.')
      })
  },
})

export const userReducer = userSlice.reducer