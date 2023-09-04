import { StatusBar } from 'react-native';
import Navigator from './src/navigation/Navigator';

import { Provider } from 'react-redux';

import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
