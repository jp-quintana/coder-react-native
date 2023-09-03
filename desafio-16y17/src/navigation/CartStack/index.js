import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import CartScreen from './CartScreen';

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName="CartScreen">
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
