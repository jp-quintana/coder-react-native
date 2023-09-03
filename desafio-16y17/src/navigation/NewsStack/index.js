import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import NewsScreen from './NewsScreen';

const NewsStack = () => {
  return (
    <Stack.Navigator initialRouteName="NewsScreen">
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
    </Stack.Navigator>
  );
};

export default NewsStack;
