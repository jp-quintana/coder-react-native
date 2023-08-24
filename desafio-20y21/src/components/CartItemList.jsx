import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';

import CartItem from './CartItem';

const CartItemList = ({ items }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
};

export default CartItemList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
