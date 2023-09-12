import Header from 'components/Header';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from 'screens/SignupScreen';
import LoginScreen from 'screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} />;
        },
      })}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
