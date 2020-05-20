import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { USER_LS, TOKENS_LS } from '@constants';
import { request } from '@api';
import { LocalStorage } from '@libs';
import { Notification } from '@components';
import { createAppStore } from './store';
import { Navigation } from './navigation/AppNavigator';

const App = () => {
  const [isReady, setReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setIsUser] = useState(false);

  const setInitialData = async () => {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto.ttf'),
      Roboto_medium: require('./assets/fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });

    const isStorageAuth = await LocalStorage.has(TOKENS_LS);
    const storageUser = await LocalStorage.get(USER_LS);

    setIsAuth(isStorageAuth);
    setIsUser(storageUser);
  };

  if (!isReady) {
    return <AppLoading startAsync={setInitialData} onFinish={() => setReady(true)} onError={e => console.error(e)} />;
  } else {
    const store = createAppStore({ isAuth, user });
    request.connectStore(store);

    return (
      <Provider store={store}>
        <Root>
          <Notification />
          <Navigation />
        </Root>
      </Provider>
    );
  }
};

export default App;
