import { StatusBar } from 'react-native';
import Navigator from './src/navigation/Navigator';

export default function App() {
  return (
    <>
      <Navigator />
      <StatusBar style="auto" />
    </>
  );
}
