import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageActive: 'DASHBOARD',
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setPageActive: (state, payload) => {
      state.pageActive = payload;
    },
  },
});
export const { setPageActive } = commonSlice.actions;
export default commonSlice.reducer;
