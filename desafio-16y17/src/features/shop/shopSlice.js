import { createSlice } from '@reduxjs/toolkit';

// import productsData from 'data/products.json';
// import categoriesData from 'data/categories.json';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    products: null,
    selectedProductId: null,
    // categorySelected: null,
    // selectedProduct: null,
    // allProducts: productsData,
    // allCategories: categoriesData,
    // selectedProducts: [],
  },
  reducers: {
    // setCategorySelected: (state, action) => {
    //   // state.selectedProducts = state.allProducts.filter(
    //   //   (product) => product.category === action.payload
    //   // );
    //   state.categorySelected = action.payload;
    // },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductSelected: (state, action) => {
      // state.selectedProduct = state.allProducts.find(
      //   (product) => product.id === action.payload
      // );
      state.selectedProductId = action.payload;
    },
  },
});

export const { setProducts, setProductSelected } = shopSlice.actions;

export default shopSlice.reducer;
