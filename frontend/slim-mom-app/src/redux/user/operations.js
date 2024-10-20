import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const { REACT_APP_BACKEND_URL } = process.env;
// Set base URL
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

// Utility to add JWT
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Fetch User Profile
export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, thunkAPI) => {
        // const state = thunkAPI.getState();
        // const token = state.auth.accessToken;

       /* if (!token) {
          //  return thunkAPI.rejectWithValue('No token provided');
        }*/

        try {
            // setAuthHeader(token);
            const response = await axios.get('/users/current');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const calculateCalorieIntake = createAsyncThunk(
    'user/calculateCalorieIntake',
    async (formData, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.accessToken;

        if (token) {
          setAuthHeader(token);
        }

        try {
            const { data } = await axios.post('users/daily-calorie-intake', formData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);