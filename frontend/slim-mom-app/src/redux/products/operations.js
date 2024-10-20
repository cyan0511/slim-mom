import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const { REACT_APP_BACKEND_URL } = process.env;

axios.defaults.baseURL = REACT_APP_BACKEND_URL;


export const listCategories = createAsyncThunk(
    'products/categories',
    async (bloodType, thunkAPI) => {
        try {
            const query = bloodType ? `?bloodType=${bloodType}` : '';
            const response = await axios.get(`/categories${query}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
        }
    }
);

export const listProducts = createAsyncThunk(
    'products',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/products');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
        }
    }
);