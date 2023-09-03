import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotificationsScreen from './NotificationsScreen';

import { Colors } from '../../helpers/colors';

const Stack = createNativeStackNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationsScreen"
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
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  );
};

export default NewsStack;
