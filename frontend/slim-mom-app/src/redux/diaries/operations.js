import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {format} from "date-fns";

const { REACT_APP_BACKEND_URL } = process.env;

axios.defaults.baseURL = REACT_APP_BACKEND_URL;

export const listDiaries = createAsyncThunk(
    'diaries/listDiaries',
    async (date, thunkAPI) => {
        try {
            let query = '';
            const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
            query = formattedDate ? `?date=${formattedDate}` : ''
            const response = await axios.get(`/diaries${query}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
        }
    }
);

export const addDiary = createAsyncThunk(
    'diaries/addDiary',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('/diaries', data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue( { message: error?.response?.data?.errors[0]?.message }); // Reject the promise with the error message
        }
    }
);

export const deleteDiary = createAsyncThunk(
    'diaries/deleteDiary',
    async (_id, thunkAPI) => {
        try {
            await axios.delete(`/diaries/${_id}`);
            return _id; // Return the id to identify which contact was deleted
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message); // Reject the promise with the error message
        }
    }
);

export const setDate = createAsyncThunk(
    'diaries/setDate',
    async (date, thunkAPI) => {
        try {
            return date;
        } catch (error) {
            return thunkAPI.rejectWithValue( { message: error?.response?.data?.message }); // Reject the promise with the error message
        }
    }
);