import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { useGetOrdersByUserIdQuery } from '../../services/shopServices';

const OrdersScreen = () => {
  // const { email } = useSelector((state) => state.userReducer);

  // const { data: orders, isLoading, refetch } = useGetOrdersByUserQuery(email);

  // // TODO: Update
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     refetch();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View>
      <Text>OrdersScreen</Text>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
