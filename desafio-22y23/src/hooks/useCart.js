import { useDispatch, useSelector } from 'react-redux';
import { update, reset } from 'features/cart/cartSlice';

export const useCart = () => {
  const items = useSelector((state) => state.cartReducer.items);
  const dispatch = useDispatch();

  const addItem = (itemToAdd) => {
    const updatedItems = [...items];
    const itemInCartIndex = items.findIndex((item) => item.id === itemToAdd.id);

    const itemInCart = items[itemInCartIndex];

    if (itemInCart) {
      updatedItems[itemInCartIndex].quantity += 1;
    } else {
      updatedItems.push({ ...itemToAdd, quantity: 1 });
    }

    dispatch(update(updatedItems));
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    dispatch(update(updatedItems));
  };

  const emptyCart = () => {
    dispatch(reset());
  };

  return { addItem, deleteItem, emptyCart };
};
