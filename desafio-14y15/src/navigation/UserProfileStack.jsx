import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from 'components/Header';
import UserProfileScreen from 'screens/UserProfileScreen';
import ImageSelectorScreen from 'screens/ImageSelectorScreen';

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
    </Stack.Navigator>
  );
};

export default UserProfileStack;
