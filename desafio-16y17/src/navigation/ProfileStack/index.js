import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from './ProfileScreen';
import OrdersScreen from './OrdersScreen';
import ImageSelectScreen from './ImageSelectScreen';
import AddressSelectScreen from './AddressSelectScreen';

import { Colors } from '../../helpers/colors';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ title: 'Orders' }}
      />
      <Stack.Screen
        name="ImageSelectScreen"
        component={ImageSelectScreen}
        options={{ title: 'Image select' }}
      />
      <Stack.Screen
        name="AddressSelectScreen"
        component={AddressSelectScreen}
        options={{
          title: 'Address select',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
