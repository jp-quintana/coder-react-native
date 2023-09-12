import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useGetOrdersByUserQuery } from 'services/shopServices';

import OrderList from 'components/OrderList';

import { colors } from 'helpers/colors';

const OrdersScreen = ({ navigation }) => {
  const { email } = useSelector((state) => state.userReducer);

  const { data: orders, isLoading, refetch } = useGetOrdersByUserQuery(email);

  // TODO: Update
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <>
          {orders.length > 0 ? (
            <OrderList items={orders} />
          ) : (
            <Text>No orders added yet!</Text>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
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
