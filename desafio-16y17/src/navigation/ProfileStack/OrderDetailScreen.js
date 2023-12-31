import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { formatDate, formatPrice } from '../../helpers/format';

import { Colors } from '../../helpers/colors';

const RenderItem = ({
  imageUrl,
  title,
  quantity,
  isFirstElement,
  isLastElement,
}) => {
  const firstElementMargin = isFirstElement ? { marginTop: 12 } : undefined;
  const lastElementMargin = isLastElement ? { marginBottom: 240 } : undefined;

  return (
    <View
      style={[styles.item_container, firstElementMargin, lastElementMargin]}
    >
      <Image source={{ uri: imageUrl }} style={styles.item_image} />
      <Text style={styles.item_title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={styles.item_quantity}>x {quantity}</Text>
    </View>
  );
};
const OrderDetailScreen = ({ route }) => {
  const { orders } = useSelector((state) => state.orderReducer);
  const { orderId } = route.params;

  const [selectedOrder, setSelectedOrder] = useState(null);

  useLayoutEffect(() => {
    setSelectedOrder(orders.find((order) => order.id === orderId));
  }, []);

  return (
    <View style={styles.conatiner}>
      {!selectedOrder && <Text style={styles.loading}>Loading...</Text>}
      {selectedOrder && (
        <>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              Order {selectedOrder.id}
            </Text>
            <Text style={styles.date}>
              {formatDate(selectedOrder.createdAt)}
            </Text>
          </View>
          <View style={styles.order_price_container}>
            <Text style={styles.order_price_text}>Total:</Text>
            <Text style={styles.order_price}>
              {`$ ${formatPrice(selectedOrder.total)}`}
            </Text>
          </View>
          <View>
            <FlatList
              data={selectedOrder.items}
              renderItem={({ item, index }) => (
                <RenderItem
                  imageUrl={item.imageUrl}
                  title={item.title}
                  quantity={item.quantity}
                  isFirstElement={index === 0}
                  isLastElement={index === selectedOrder.items.length - 1}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  date: {
    marginLeft: 'auto',
    paddingLeft: 6,
  },
  item_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 6,
  },
  item_image: {
    borderRadius: 10,
    height: 60,
    width: 60,
  },
  item_title: {
    flexShrink: 1,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 12,
  },
  item_quantity: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    paddingLeft: 6,
  },
  order_price_container: {
    paddingVertical: 12,
    borderTopColor: Colors.text,
    borderTopWidth: 1,
    borderBottomColor: Colors.text,
    borderBottomWidth: 1,
    marginTop: 12,
    textAlign: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  order_price_text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  order_price: {
    fontSize: 18,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
});
