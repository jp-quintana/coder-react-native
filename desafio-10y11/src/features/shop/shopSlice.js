import { createSlice } from '@reduxjs/toolkit';

import productsData from 'data/products.json';
import categoriesData from 'data/categories.json';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    categorySelected: '',
    productIdSelected: null,
    allProducts: productsData,
    allCategories: categoriesData,
    selectedProducts: [],
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.selectedProducts = state.allProducts.filter(
        (product) => product.category !== action.payload
      );
      state.categorySelected = action.payload;
    },
    setProductIdSelected: (state, action) => {
      state.productIdSelected = action.payload;
    },
  },
});

export const { setCategorySelected, setProductIdSelected } = shopSlice.actions;

export default shopSlice.reducer;
