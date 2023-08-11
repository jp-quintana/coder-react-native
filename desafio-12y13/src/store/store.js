import { configureStore } from '@reduxjs/toolkit';
import shopReducer from 'features/shop/shopSlice';
import cartReducer from 'features/cart/cartSlice';
import orderReducer from 'features/order/orderSlice';
import userReducer from 'features/user/userSlice';
import { shopApi } from 'services/shopServices';
import { authApi } from 'services/authServices';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    orderReducer,
    userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
