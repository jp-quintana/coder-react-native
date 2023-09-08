import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    categories: null,
    products: null,
    selectedProductId: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // setProductSelected: (state, action) => {
    //   state.selectedProductId = action.payload;
    // },
  },
});

export const { setCategories, setProducts } = shopSlice.actions;

export default shopSlice.reducer;
