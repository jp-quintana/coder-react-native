import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from 'helpers/colors';

const Order = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info_container}>
        <Text style={styles.info_text}>{order.createdAt}</Text>
        <Text style={styles.info_text}>${order.total}</Text>
      </View>
      <Pressable>
        <MaterialCommunityIcons name="magnify" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default Order;

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
