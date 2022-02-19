import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create new Goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalsText, ThunkApi) => {
    try {
      const token = ThunkApi.getState().auth.user.token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.post('/api/goals/', goalsText, config);
      if (data) {
        localStorage.setItem('goals', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const getGoals = createAsyncThunk(
  'goals/get',
  async (payload, ThunkApi) => {
    try {
      const token = ThunkApi.getState().auth.user.token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios('/api/goals/', config);

      return data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [createGoal.pending]: (state) => {
      state.goals = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = '';
    },
    [createGoal.fulfilled]: (state, action) => {
      state.goals.push(action.payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [createGoal.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = action.payload;
    },
    [getGoals.pending]: (state) => {
      state.goals = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
      state.message = '';
    },
    [getGoals.fulfilled]: (state, action) => {
      state.goals = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getGoals.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = action.payload;
    },
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
