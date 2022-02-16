import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// get the user from the local Storage;
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, ThunkApi) => {
    try {
      const { data } = await axios.post('/api/users/register', user);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      const message =
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.message &&
        error.toString;
      return ThunkApi.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
