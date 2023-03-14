import React, { useState } from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { USER_LS, TOKENS_LS } from './constants';
import { request } from './api';
import { LocalStorage } from './libs';
import { Notification } from './components';
import { createAppStore } from './store';
import { Navigation } from './navigation';

const App = () => {
  const [isReady, setReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setIsUser] = useState(false);

  const setInitialData = async () => {
    await Font.loadAsync({
      RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
      RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
      ...Ionicons.font
    });

    const isStorageAuth = await LocalStorage.has(TOKENS_LS);
    const storageUser = await LocalStorage.get(USER_LS);

    setIsAuth(isStorageAuth);
    setIsUser(storageUser);
  };

  if (!isReady) {
    return <AppLoading startAsync={setInitialData} onFinish={() => setReady(true)} onError={(e) => console.error(e)} />;
  }

  const store = createAppStore({ isAuth, user });
  request.connectStore(store);

  return (
    <Provider store={store}>
        <Notification />
        <Navigation />
    </Provider>
  );
};

export default App;
