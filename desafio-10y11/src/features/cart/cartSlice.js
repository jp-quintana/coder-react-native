import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    update: (state, action) => {
      state.items = action.payload;
    },

    reset: (state) => {
      state.items = [];
    },
  },
});

export const { update, reset } = cartSlice.actions;

export default cartSlice.reducer;
