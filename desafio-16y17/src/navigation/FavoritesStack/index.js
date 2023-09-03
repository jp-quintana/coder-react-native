import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import FavoritesScreen from './FavoritesScreen';

const FavoritesStack = () => {
  return (
    <Stack.Navigator initialRouteName="FavoritesScreen">
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
