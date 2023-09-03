import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import NewsStack from './NewsStack';
import CartStack from './CartStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const auth = true;
  return (
    <NavigationContainer>
      <>
        {auth ? (
          <AuthStack />
        ) : (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="News" component={NewsStack} />
            <Tab.Screen name="Cart" component={CartStack} />
            <Tab.Screen name="Favorites" component={FavoritesStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        )}
      </>
    </NavigationContainer>
  );
};

export default Navigator;
