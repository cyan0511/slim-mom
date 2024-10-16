import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshToken } from './authOperations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    refreshToken: null,
    sid: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;

        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isRefreshing = false;
      })
      .addCase(register.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(register.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logIn.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;

        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = "";
        state.refreshToken = null;
        state.sid = null;
        state.isRefreshing = false;
      })
      .addCase(logOut.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logOut.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(refreshToken.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;

        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
      })
      .addCase(refreshToken.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
