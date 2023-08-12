import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from 'components/Header';
import UserProfileScreen from 'screens/UserProfileScreen';
import ImageSelectorScreen from 'screens/ImageSelectorScreen';
import AddressScreen from 'screens/AddressScreen';
import LocationSelectorScreen from 'screens/LocationSelectorScreen';

const Stack = createNativeStackNavigator();

const UserProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Profile"
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
      })}
    >
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
      <Stack.Screen name="Image Selector" component={ImageSelectorScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen
        name="Location Selector"
        component={LocationSelectorScreen}
      />
    </Stack.Navigator>
  );
};

export default UserProfileStack;
