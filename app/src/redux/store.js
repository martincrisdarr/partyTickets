import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import partysSlice from './features/partysSlice'
import ticketsSlice from './features/ticketsSlice'
import sellersSlice from './features/sellersSlice'
import ticketsFlowSlice from './features/ticketsFlowSlice'
import commonSlice from './features/commonSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    partys: partysSlice,
    tickets: ticketsSlice,
    sellers: sellersSlice,
    ticketsFlow: ticketsFlowSlice,
    common: commonSlice
  },
})