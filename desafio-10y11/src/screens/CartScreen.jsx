import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import { useOrder } from 'hooks/useOrder';

import CartItemList from 'components/CartItemList';

import { colors } from 'helpers/colors';

const CartScreen = () => {
  const { createOrder } = useOrder();
  const items = useSelector((state) => state.cartReducer.items);

  const cartTotal = items.reduce((a, b) => a + b.quantity * b.price, 0);

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <>
          <CartItemList items={items} />
          <Text style={styles.total}>Total: ${cartTotal}</Text>
          <Pressable onPress={() => createOrder(items)} style={styles.button}>
            <Text style={styles.button_text}>Confirm</Text>
          </Pressable>
        </>
      ) : (
        <Text>No items added to cart yet!</Text>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  total: {
    marginTop: 40,
    marginBottom: 15,
  },

  button: {
    backgroundColor: colors.mauve,
    padding: 10,
    borderRadius: 10,
  },
  button_text: {
    color: colors.white,
    fontWeight: 700,
  },
});
