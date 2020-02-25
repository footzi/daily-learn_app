import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import Notification from './components/notification';

// const store = configureStore();

const _loadAssets = async () => {
  await Font.loadAsync({
    Roboto: require('./assets/fonts/Roboto.ttf'),
    Roboto_medium: require('./assets/fonts/Roboto_medium.ttf'),
    ...Ionicons.font
  });
};

const App = () => {
  const [isReady, setReady] = useState(false);

  // import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssets} // this loads the fonts
        onFinish={() => setReady(true)}
        onError={e => console.error(e)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <Root>
          <Notification />
          <AppNavigator />
        </Root>
      </Provider>
    );
  }
};

export default App;
