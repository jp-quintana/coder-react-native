import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { usePostCartMutation } from '../../services/shopServices';

import {
  addItem,
  deleteItem,
  removeItem,
  clearCart,
} from '../../features/cart/cartSlice';

import CartItem from '../../components/CartItem';
import PrimaryButton from '../../components/PrimaryButton';

import { formatPrice } from '../../helpers/format';

const CartScreen = ({ navigation }) => {
  const { items, updatedAt } = useSelector((state) => state.cartReducer);
  const { email } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const [triggerPostCart] = usePostCartMutation();

  const handleAddItem = (itemToAdd) => {
    dispatch(addItem({ itemToAdd }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ itemId }));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem({ itemId }));
  };

  const totalPrice = items.reduce((totalPrice, item) => {
    return (totalPrice += item.quantity * item.price);
  }, 0);

  const handleSubmit = async () => {
    try {
      await triggerPostCart({
        user: email,
        items,
        total: totalPrice,
        createdAt: updatedAt,
      });
      dispatch(clearCart());
      navigation.navigate('Profile', {
        screen: 'ProfileScreen',
        params: { orderCompleted: true },
      });
      // navigation.navigate('Profile', { screen: 'OrdersScreen' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {items.length === 0 && (
        <Text style={styles.no_items}>No items in cart yet!</Text>
      )}
      {items.length > 0 && (
        <>
          <View style={styles.controls}>
            <View style={styles.total_container}>
              <Text style={styles.text}>Total:</Text>
              <Text style={styles.total_price}>{`$ ${formatPrice(
                totalPrice
              )}`}</Text>
            </View>
            <PrimaryButton onPress={handleSubmit}>Confirm Order</PrimaryButton>
          </View>
          <View>
            <View style={styles.list_container}>
              <FlatList
                data={items}
                renderItem={({ item, index }) => (
                  <CartItem
                    item={item}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    quantity={item.quantity}
                    onPressAdd={handleAddItem}
                    onPressRemove={handleRemoveItem}
                    onPressDelete={handleDeleteItem}
                    isFirstElement={index === 0}
                    isLastElement={index === items.length - 1}
                  />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  no_items: {
    textAlign: 'center',
  },
  controls: {
    gap: 15,
    marginHorizontal: 4,
  },
  total_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  total_price: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  list_container: {
    marginTop: 4,
    paddingBottom: 64,
  },
});
