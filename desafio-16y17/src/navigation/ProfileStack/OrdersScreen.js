import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useGetOrdersByUserQuery } from '../../services/shopServices';
import { setOrders } from '../../features/order/orderSlice';

import OrderItem from '../../components/OrderItem';

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.userReducer);
  const { orders } = useSelector((state) => state.orderReducer);

  const {
    data: fetchedOrders,
    isLoading,
    refetch,
  } = useGetOrdersByUserQuery(email);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (fetchedOrders && !isLoading) {
      dispatch(setOrders(fetchedOrders));
    }
  }, [fetchedOrders]);

  return (
    <View style={styles.container}>
      {(!fetchedOrders || isLoading) && (
        <Text style={styles.loading}>Loading...</Text>
      )}
      {fetchedOrders && !isLoading && (
        <>
          {orders.length === 0 && (
            <Text style={styles.no_orders}>You have no orders yet!</Text>
          )}
          {orders.length > 0 && (
            <FlatList
              data={orders}
              renderItem={({ item, index }) => (
                <OrderItem
                  id={item.id}
                  items={item.items}
                  total={item.total}
                  createdAt={item.createdAt}
                  isLastElement={index === orders.length - 1}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  loading: {
    textAlign: 'center',
  },
  no_orders: {
    textAlign: 'center',
  },
});
