import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  },
  reducers: {
    create: (state, action) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { create } = orderSlice.actions;

export default orderSlice.reducer;
