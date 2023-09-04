import { createSlice } from '@reduxjs/toolkit';

// import categoriesData from 'data/categories.json';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    categorySelected: null,
    selectedProductId: null,
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    setProductSelected: (state, action) => {
      state.selectedProductId = action.payload;
    },
  },
});

export const { setCategorySelected, setProductSelected } = shopSlice.actions;

export default shopSlice.reducer;
