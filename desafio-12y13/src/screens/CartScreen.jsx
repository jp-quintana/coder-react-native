import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { usePostCartMutation } from 'services/shopServices';
import { useCart } from 'hooks/useCart';

import CartItemList from 'components/CartItemList';

import { colors } from 'helpers/colors';

const CartScreen = () => {
  const { navigate } = useNavigation();

  const [triggerPostCart, result] = usePostCartMutation();
  const { user, items, updatedAt } = useSelector((state) => state.cartReducer);
  const { emptyCart } = useCart();

  const cartTotal = items.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleCreateOrder = async () => {
    try {
      await triggerPostCart({
        user,
        items,
        total: cartTotal,
        createdAt: updatedAt,
      });
      emptyCart();
      navigate('OrdersStack');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <>
          <CartItemList items={items} />
          <Text style={styles.total}>Total: ${cartTotal}</Text>
          <Pressable onPress={handleCreateOrder} style={styles.button}>
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
