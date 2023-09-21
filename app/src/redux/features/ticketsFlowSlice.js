import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const addTicketsFlow = createAsyncThunk('ticketsFlow/addOne', async (payload) => {
  try {
    const response = await axios.post('/ticketsFlow', payload);
    return response.data;
  } catch (e) {
    const axiosError = e.response?.data;
    return Promise.reject(axiosError.message);
  }
});

export const getTicketsFlowByEvent = createAsyncThunk(
  'ticketsFlow/getTicketsFlowByEvent',
  async (payload) => {
    try {
      const response = await axios.get(`/ticketsFlow/event/${payload}`);
      return response.data;
    } catch (e) {
      const axiosError = e.response?.data;
      return Promise.reject(axiosError.message);
    }
  }
);
export const getTicketsFlowBySeller = createAsyncThunk(
  'ticketsFlow/getTicketsFlowBySeller',
  async (payload) => {
    try {
      const response = await axios.get(`/ticketsFlow/seller/${payload._id}?event=${payload.event}`);
      return response.data;
    } catch (e) {
      const axiosError = e.response?.data;
      return Promise.reject(axiosError.message);
    }
  }
);
export const getTicketsFlowBySellerType = createAsyncThunk(
  'ticketsFlow/getTicketsFlowBySellerType',
  async (payload) => {
    try {
      const response = await axios.get(
        `/ticketsFlow/seller/type/${payload._id}?event=${payload.event}&ticket=${payload.type}&step=${payload.step}`
      );
      return response.data;
    } catch (e) {
      const axiosError = e.response?.data;
      return Promise.reject(axiosError.message);
    }
  }
);

const initialState = {
  ticketsFlow: [],
  ticketsFlowSellerType: [],
  isFetching: false,
  message: null,
  error: false,
};

export const ticketsFlowSlice = createSlice({
  name: 'ticketsFlow',
  initialState,
  reducers: {
    cleanTicketsFlow: (initialState) => {
      (initialState.ticketsFlow = []), (initialState.ticketsFlowSellerType = []);
    },
  },

  extraReducers: (builder) => {
    //CREATE TICKETSFLOW
    builder.addCase(addTicketsFlow.fulfilled, (state) => {
      state.message = 'Success';
      state.isFetching = false;
      toast.success('Tickets asignados con éxito');
    });
    builder.addCase(addTicketsFlow.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(addTicketsFlow.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
    //GET TICKETS FLOW BY EVENT
    builder.addCase(getTicketsFlowByEvent.fulfilled, (state, action) => {
      state.message = 'Success';
      state.isFetching = false;
      state.ticketsFlow = action.payload.message;
    });
    builder.addCase(getTicketsFlowByEvent.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTicketsFlowByEvent.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
    //GET TICKETS FLOW BY SELLER
    builder.addCase(getTicketsFlowBySeller.fulfilled, (state, action) => {
      state.message = 'Success';
      state.isFetching = false;
      state.ticketsFlow = action.payload.message;
    });
    builder.addCase(getTicketsFlowBySeller.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTicketsFlowBySeller.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
    //GET TICKETS FLOW BY SELLER TYPE
    builder.addCase(getTicketsFlowBySellerType.fulfilled, (state, action) => {
      state.message = 'Success';
      state.isFetching = false;
      state.ticketsFlowSellerType = action.payload.message;
    });
    builder.addCase(getTicketsFlowBySellerType.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTicketsFlowBySellerType.rejected, (state, action) => {
      state.isFetching = false;
      state.message = action.error.message;
      state.error = true;
      toast.error(action.error.message);
    });
  },
});
export const { cleanTicketsFlow } = ticketsFlowSlice.actions;
export default ticketsFlowSlice.reducer;
