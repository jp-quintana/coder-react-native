import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';

import Order from './Order';

const OrderList = ({ items }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        // TODO: update key
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item }) => <Order order={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
