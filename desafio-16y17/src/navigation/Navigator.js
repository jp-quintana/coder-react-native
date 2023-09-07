import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import {
  useGetProductsQuery,
  useGetFavoritesQuery,
} from '../services/shopServices';

import { setProducts } from '../features/shop/shopSlice';
import { setFavorites } from '../features/user/userSlice';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import NotificationsStack from './NotificationsStack';
import CartStack from './CartStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';

import { Colors } from '../helpers/colors';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shopReducer);
  const { localId } = useSelector((state) => state.userReducer);

  const { data: fetchedProducts, isLoading: productsBeingFetched } =
    useGetProductsQuery();

  const { data: fetchedFavorites, isLoading: favoritesBeingFetched } =
    useGetFavoritesQuery(localId);

  useEffect(() => {
    if (fetchedProducts?.length > 0) dispatch(setProducts(fetchedProducts));
  }, [productsBeingFetched]);

  useEffect(() => {
    if (localId) {
      if (fetchedFavorites) dispatch(setFavorites(fetchedFavorites));
    }
  }, [favoritesBeingFetched, localId]);

  return (
    <NavigationContainer>
      <>
        {!localId ? (
          <AuthStack />
        ) : (
          <>
            {!products && <Text style={styles.loading}>Loading...</Text>}
            {products && (
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
                  name="Notifications"
                  component={NotificationsStack}
                  options={{
                    tabBarIcon: ({ focused }) => {
                      return (
                        <Ionicons
                          name={
                            focused ? 'notifications' : 'notifications-outline'
                          }
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
  loading: {
    textAlign: 'center',
  },
});
