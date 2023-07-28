import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import OrderList from 'components/OrderList';

// import orders from 'data/orders.json';

import { colors } from 'helpers/colors';

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orderReducer.orders);

  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <OrderList items={orders} />
      ) : (
        <Text>No orders added yet!</Text>
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ivory,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
