import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import Navigator from './src/navigation/Navigator';

import { fontVariants } from 'helpers/fonts';

export default function App() {
  const [fontsLoaded] = useFonts(fontVariants);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Navigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
