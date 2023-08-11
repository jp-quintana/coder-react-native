import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';

import store from './src/store/store';

import { fontVariants } from 'helpers/fonts';

export default function App() {
  const [fontsLoaded] = useFonts(fontVariants);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
