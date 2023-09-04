// import { useDispatch, useSelector } from 'react-redux';
// import { create } from 'features/order/orderSlice';
// import { reset } from 'features/cart/cartSlice';

// export const useOrder = () => {
//   const orders = useSelector((state) => state.orderReducer.orders);
//   const dispatch = useDispatch();

//   const createOrder = (items) => {
//     const newOrder = {
//       id: orders.length + 1,
//       userId: 'jp',
//       createdAt: new Date().getTime(),
//       items,
//     };

//     dispatch(create(newOrder));
//     dispatch(reset());
//   };

//   return { createOrder };
// };
