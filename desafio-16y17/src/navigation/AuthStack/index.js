import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../helpers/colors';

import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
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
        name="StartScreen"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
