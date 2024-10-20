import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const { REACT_APP_BACKEND_URL } = process.env;

axios.defaults.baseURL = REACT_APP_BACKEND_URL;

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      await axios.post('/auth/register', { name, email, password });
      // After successful registration, add the token to the HTTP header
      // setAuthHeader(res.data.token);
      // return res.data;
      const loginResponse = await thunkAPI.dispatch(logIn({ email, password }));
      return loginResponse.payload; // Return the login response payload
    } catch (error) {
      const status = error.response.status;
      const { message } = error.response?.data;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = res.data;

      // After successful login, add the token to the HTTP header
      setAuthHeader(accessToken);
      return { user, accessToken, refreshToken };
    } catch (error) {
      const status = error.response.status;
      const { message } = error.response?.data;
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedRefreshToken = state.auth.refreshToken;

    if (!persistedRefreshToken) {
      return thunkAPI.rejectWithValue(
        'Unable to refresh token: Missing token or SID'
      );
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedRefreshToken);
      const res = await axios.post('/auth/refresh', { refreshToken: persistedRefreshToken });

      const {
        accessToken,
        refreshToken: newRefreshToken
      } = res.data;

      // Set the new access token in the Authorization header
      setAuthHeader(accessToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
