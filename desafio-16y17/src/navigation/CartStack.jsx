import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CartScreen from 'screens/CartScreen';
import Header from 'components/Header';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
      })}
    >
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
