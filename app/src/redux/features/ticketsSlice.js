import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const addTickets = createAsyncThunk('tickets/addOne', async (payload) => {
  try {
    const response = await axios.post('/tickets', payload);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

export const getEventTickets = createAsyncThunk('tickets/event', async (payload) => {
  try {
    const response = await axios.get('/tickets/event', payload);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

const initialState = {
  tickets: [],
  isFetching: false,
  message: null,
  error: false,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,

  extraReducers: (builder) => {
    //CREATE TICKETS
    builder.addCase(addTickets.fulfilled, (state) => {
      state.message = 'Success';
      state.isFetching = false;
    });
    builder.addCase(addTickets.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(addTickets.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });

    //GET EVENT TICKETS
    builder.addCase(getEventTickets.fulfilled, (state, action) => {
      state.tickets = action.payload
      state.message = 'Success';
      state.isFetching = false;
    });
    builder.addCase(getEventTickets.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getEventTickets.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
  },
});

export default ticketsSlice.reducer;
