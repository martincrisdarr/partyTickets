import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getAllPartys = createAsyncThunk('events/getAll', async () => {
  try {
    const response = await axios.get('/events');
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

export const getOneParty = createAsyncThunk('events/getOne', async (payload) => {
  try {
    const response = await axios.get(`/events/${payload}`);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

export const addParty = createAsyncThunk('events/create', async (payload) => {
  try {
    const response = await axios.post('/events', payload);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

export const removeParty = createAsyncThunk('events/remove', async (payload) => {
  try {
    const response = await axios.delete(`/events/${payload}`);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

const initialState = {
  partys: null,
  party: {},
  isFetching: false,
  message: null,
  error: false,
};

export const partysSlice = createSlice({
  name: 'partys',
  initialState,

  extraReducers: (builder) => {
    //GET ALL PARTYS
    builder.addCase(getAllPartys.fulfilled, (state, action) => {
      state.partys = action.payload;
      state.message = 'Success';
      state.isFetching = false;
    });
    builder.addCase(getAllPartys.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getAllPartys.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });

    //GET ONE PARTY
    builder.addCase(getOneParty.fulfilled, (state, action) => {
      state.party = action.payload;
      state.message = 'Success';
      state.isFetching = false;
    });
    builder.addCase(getOneParty.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getOneParty.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });

    //ADD PARTY
    builder.addCase(addParty.fulfilled, (state) => {
      state.isFetching = false;
      state.message = 'Creada con éxito';
      toast.success('Creada con éxito');
    });
    builder.addCase(addParty.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(addParty.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });

    //REMOVE PARTY
    builder.addCase(removeParty.fulfilled, (state) => {
      state.isFetching = false;
      state.message = 'Eliminada con éxito';
      toast.success('Eliminada con éxito');
    });
    builder.addCase(removeParty.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(removeParty.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
  },
});

export default partysSlice.reducer;
