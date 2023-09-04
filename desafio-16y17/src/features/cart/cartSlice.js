import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    updatedAt: Date.now().toLocaleString(),
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { itemToAdd } = action.payload;

      const updatedItems = [...state.items];
      const itemInCartIndex = state.items.findIndex(
        (item) => item.id === itemToAdd.id
      );

      const itemInCart = updatedItems[itemInCartIndex];

      if (itemInCart) {
        updatedItems[itemInCartIndex].quantity += 1;
      } else {
        updatedItems.push({ ...itemToAdd, quantity: 1 });
      }

      state.items = updatedItems;
      state.updatedAt = new Date().toLocaleString();
    },

    removeItem: (state, action) => {
      const { itemId } = action.payload;

      const updatedItems = [...state.items];

      const itemInCartIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      if (updatedItems[itemInCartIndex].quantity === 1) {
        updatedItems.splice(itemInCartIndex, 1);
      } else {
        updatedItems[itemInCartIndex].quantity -= 1;
      }
      state.items = updatedItems;
      state.updatedAt = new Date().toLocaleString();
    },

    deleteItem: (state, action) => {
      const { itemId } = action.payload;

      const updatedItems = state.items.filter((item) => item.id !== itemId);

      state.items = updatedItems;
      state.updatedAt = new Date().toLocaleString();
    },

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

export const { addItem, removeItem, deleteItem, update, reset } =
  cartSlice.actions;

export default cartSlice.reducer;
