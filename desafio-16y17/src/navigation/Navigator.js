import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import NewsStack from './NewsStack';
import CartStack from './CartStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';

import { Colors } from '../helpers/colors';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const auth = false;
  return (
    <NavigationContainer>
      <>
        {auth ? (
          <AuthStack />
        ) : (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: styles.tab,
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Ionicons
                      name={focused ? 'home' : 'home-outline'}
                      size={24}
                      color={focused ? Colors.primary : Colors.text}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="News"
              component={NewsStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Ionicons
                      name={focused ? 'notifications' : 'notifications-outline'}
                      size={24}
                      color={focused ? Colors.primary : Colors.text}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Cart"
              component={CartStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  const iconStyles = {
                    position: 'absolute',
                    top: '-50%',
                    padding: 15,
                    borderRadius: 100,
                    backgroundColor: focused ? Colors.primary : Colors.text,
                  };
                  return (
                    <Ionicons
                      name={focused ? 'cart' : 'cart-outline'}
                      size={24}
                      color="white"
                      style={iconStyles}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoritesStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Ionicons
                      name={focused ? 'heart' : 'heart-outline'}
                      size={24}
                      color={focused ? Colors.primary : Colors.text}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Ionicons
                      name={focused ? 'person' : 'person-outline'}
                      size={24}
                      color={focused ? Colors.primary : Colors.text}
                    />
                  );
                },
              }}
            />
          </Tab.Navigator>
        )}
      </>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
