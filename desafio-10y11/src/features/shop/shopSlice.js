import { createSlice } from '@reduxjs/toolkit';

import productsData from 'data/products.json';
import categoriesData from 'data/categories.json';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    // categorySelected: '',
    selectedProduct: null,
    allProducts: productsData,
    allCategories: categoriesData,
    selectedProducts: [],
  },
  reducers: {
    setCategorySelected: (state, action) => {
      state.selectedProducts = state.allProducts.filter(
        (product) => product.category === action.payload
      );
      // state.categorySelected = action.payload;
    },
    setProductSelected: (state, action) => {
      state.selectedProduct = state.allProducts.find(
        (product) => product.id === action.payload
      );
    },
  },
});

export const { setCategorySelected, setProductSelected } = shopSlice.actions;

export default shopSlice.reducer;
