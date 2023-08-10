import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    user: 'admin',
    updatedAt: Date.now().toLocaleString(),
    items: [],
  },
  reducers: {
    update: (state, action) => {
      state.items = action.payload;
      state.updatedAt = new Date().toLocaleString();
    },

    reset: (state) => {
      state.items = [];
      state.updatedAt = new Date().toLocaleString();
    },
  },
});

export const { update, reset } = cartSlice.actions;

export default cartSlice.reducer;
