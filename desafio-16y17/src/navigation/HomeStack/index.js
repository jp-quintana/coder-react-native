import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';

import { Colors } from '../../helpers/colors';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
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
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
