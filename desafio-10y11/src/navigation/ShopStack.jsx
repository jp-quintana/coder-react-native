import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Header from 'components/Header';
import CategoriesScreen from 'screens/CategoriesScreen';
import ProductsScreen from 'screens/ProductsScreen';
import ProductDetailScreen from 'screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
      })}
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product Details" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default ShopStack;
