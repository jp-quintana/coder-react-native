import { configureStore } from '@reduxjs/toolkit';
import shopReducer from 'features/shop/shopSlice';
import cartReducer from 'features/cart/cartSlice';
import orderReducer from 'features/order/orderSlice';
import { shopApi } from 'services/shopServices';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    orderReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

setupListeners(store.dispatch);

export default store;
