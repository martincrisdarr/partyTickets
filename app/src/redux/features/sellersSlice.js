import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const createSellers = createAsyncThunk('sellers/addOne', async (payload) => {
  try {
    const response = await axios.post('/sellers', payload);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});
export const getAllSellers = createAsyncThunk('sellers/getAllSellers', async () => {
  try {
    const response = await axios.get('/sellers');
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});
export const getOneSeller = createAsyncThunk('sellers/getOneSeller', async (payload) => {
  try {
    const response = await axios.get(`/sellers/${payload}`);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});


const initialState = {
  sellers: [],
  seller: {},
  isFetching: false,
  message: null,
  error: false,
};

export const sellersSlice = createSlice({
  name: 'sellers',
  initialState,

  extraReducers: (builder) => {
    //CREATE SELLER
    builder.addCase(createSellers.fulfilled, (state) => {
      state.message = 'Success';
      state.isFetching = false;
    });
    builder.addCase(createSellers.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(createSellers.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
    //GET ALL SELLERS
    builder.addCase(getAllSellers.fulfilled, (state, action) => {
      state.message = 'Success';
      state.sellers = action.payload.data
      state.isFetching = false;
    });
    builder.addCase(getAllSellers.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllSellers.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
    //GET ONE SELLERS
    builder.addCase(getOneSeller.fulfilled, (state, action) => {
      state.message = 'Success';
      state.seller = action.payload.data
      state.isFetching = false;
    });
    builder.addCase(getOneSeller.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getOneSeller.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
  },
});

export default sellersSlice.reducer;
