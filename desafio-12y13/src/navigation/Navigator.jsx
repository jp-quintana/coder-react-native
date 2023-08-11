import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

import ShopStack from './ShopStack';
import CartStack from './CartStack';
import OrdersStack from './OrdersStack';
import AuthStack from './AuthStack';

import { colors } from 'helpers/colors';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const { email } = useSelector((state) => state.userReducer);

  console.log('aca', email);
  return (
    <NavigationContainer>
      {email ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tab,
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="home"
                    size={24}
                    color={focused ? colors.white : colors.mauve}
                  />
                );
              },
            }}
            name="Shop"
            component={ShopStack}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="cart"
                    size={24}
                    color={focused ? colors.white : colors.mauve}
                  />
                );
              },
            }}
            name="CartStack"
            component={CartStack}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <MaterialCommunityIcons
                    name="format-list-bulleted"
                    size={24}
                    color={focused ? colors.white : colors.mauve}
                  />
                );
              },
            }}
            name="OrdersStack"
            component={OrdersStack}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    borderRadius: 10,
    bottom: 15,
    right: 10,
    left: 10,
    backgroundColor: colors.darkPurple,
  },
  icon: {
    padding: '10',
    backgroundColor: 'red',
  },
});
