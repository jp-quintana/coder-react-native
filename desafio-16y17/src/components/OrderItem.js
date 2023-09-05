import { StyleSheet, Text, View, Platform, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '../helpers/colors';
import { formatDate, formatPrice } from '../helpers/format';

const OrderItem = ({ id, items, createdAt, total }) => {
  const navigation = useNavigation();
  let summaryContent = '';

  if (items.length === 1) summaryContent = items[0].title;
  if (items.length > 1) summaryContent = `${items[0].title}, ${items[1].title}`;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('OrderDetailScreen', { orderId: id });
        }}
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [pressed ? styles.pressed : undefined]}
      >
        <View style={styles.content}>
          <View style={styles.left_container}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {`Order ${id}`}
            </Text>
            <Text style={styles.summary} numberOfLines={1} ellipsizeMode="tail">
              {summaryContent}
            </Text>
          </View>
          <View style={styles.right_container}>
            <Text style={styles.createdAt}>{formatDate(createdAt)}</Text>
            <Text style={styles.price}>{`$ ${formatPrice(total)}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  left_container: { flexShrink: 1 },
  right_container: {
    marginLeft: 'auto',
    paddingLeft: 6,
  },
  title: {
    fontWeight: 'bold',
    flexDirection: 'row',
    marginBottom: 3,
  },
  summary: {
    fontWeight: 'bold',
    color: Colors.text,
    textTransform: 'capitalize',
  },
  price: {
    marginTop: 'auto',
    textAlign: 'right',
  },
  pressed: {
    opacity: 0.8,
  },
});
