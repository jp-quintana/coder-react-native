import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import OrdersScreen from 'screens/OrdersScreen';
import Header from 'components/Header';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Orders"
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
      })}
    >
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
