import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useCart } from 'hooks/useCart';

import { colors } from 'helpers/colors';

const CartItem = ({ item }) => {
  const { deleteItem } = useCart();
  return (
    <View style={styles.container}>
      <View style={styles.info_container}>
        <Text style={styles.info_text}>
          {item.title} ({item.quantity})
        </Text>
        <Text style={styles.info_text}>{item.brand}</Text>
        <Text style={styles.info_text}>${item.price}</Text>
      </View>
      <Pressable onPress={() => deleteItem(item.id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="white"
        />
      </Pressable>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.mauve,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info_text: {
    color: colors.white,
  },
});
