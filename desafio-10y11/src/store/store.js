import { configureStore } from '@reduxjs/toolkit';
import shopSlice from 'features/shop/shopSlice';
import cartReducer from 'features/cart/cartSlice';
import orderReducer from 'features/order/orderSlice';

export default configureStore({
  reducer: {
    shopSlice,
    cartReducer,
    orderReducer,
  },
});
