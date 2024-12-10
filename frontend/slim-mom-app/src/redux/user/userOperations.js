import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/info/day', {
        params: { date: date },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// Diary Operations
export const getDiaryList = createAsyncThunk(
  'diary/getDiaryList',
  async (date, { rejectWithValue }) => {
    const formatDate = date.replaceAll('/', '-');
    try {
      const response = await axios.get('/diary/day', {
        date: formatDate,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addDiaryList = createAsyncThunk(
  'diary/add',
  async (data, { rejectWithValue }) => {
    const newDiaryList = {
      date: data.calendarDate.replaceAll('/', '-'),
      title: data.productName,
      weight: data.grams,
      calories: data.calories,
    };
    try {
      const response = await axios.post('/diary/add', newDiaryList);
      const newList = response.data.data.newList;
      const dailyRate = response.data.data.dailyRate;
      return { newList, dailyRate };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteDiaryList = createAsyncThunk(
  'diary/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/diary/delete/${JSON.stringify(data)}`
      );
      return response.data.data.results;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const searchFoods = createAsyncThunk(
  'diary/updateDiary',
  async (data, { rejectWithValue }) => {
    try {
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.clear();
      }
      toast.err(err.response.data.data.message);
      return rejectWithValue(err.message);
    }
  }
);

export const searchNotAllowedFood = createAsyncThunk(
  'calCalories/searchBadFood',
  async (data, { rejectWithValue }) => {
    const newBloodType = data.bloodType === 'n/a' ? '' : data.bloodType;
    try {
    } catch (err) {
      if (err.response && err.response === 404) {
        console.clear();
        toast.err(`No foods found for ${data.title}`);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const getDailyRate = createAsyncThunk(
  'calculator/calsNotFood',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/user/dailyRate/', credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postCalculator = createAsyncThunk(
  'calculator/postCalculator',
  async (calculator, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/archive/', calculator);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const archiveInfo = createAsyncThunk(
  'diary/archivedata',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/archive/', credentials);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getArchive = createAsyncThunk(
  'diary/getarchivedata',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/getarchive/');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getArchiveDateinfo = createAsyncThunk(
  'diary/getarchiveFromDate',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/getarchiveDate/', credentials);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteAcct = createAsyncThunk(
  'diary/deleteAccount',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/deleteAccount/');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const restoreDairyArchive = createAsyncThunk(
  'diary/restoreArchive',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/restoreArchive/', credentials);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getGraphData = createAsyncThunk(
  'diary/getGraph',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/graph/', credentials);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
