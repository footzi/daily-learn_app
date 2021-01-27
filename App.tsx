import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { USER_LS, TOKENS_LS } from '@constants';
import { request } from '@api';
import { LocalStorage } from '@libs';
import { createAppStore } from '@store';
import { Navigation } from './navigation';
import { Notification } from '@components';
import { User } from '@interfaces';

const App: React.FC = () => {
  const [isReady, setReady] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  const setInitialData = async () => {
    await Font.loadAsync({
      Museo: require('./assets/fonts/MuseoSansCyrl-500.ttf'),
      Museo300Italic: require('./assets/fonts/MuseoSansCyrl-300Italic.ttf'),
      ...Ionicons.font,
    });

    const isStorageAuth = await LocalStorage.has(TOKENS_LS);
    const storageUser: User = await LocalStorage.get(USER_LS);

    setIsAuth(isStorageAuth);
    setUser(storageUser);
  };

  if (isReady) {
    const store = createAppStore({ isAuth, user });
    request.connectStore(store);

    return (
      <Provider store={store}>
        <Navigation />
        <Notification />
      </Provider>
    );
  }

  if (!isReady) {
    return <AppLoading startAsync={setInitialData} onFinish={() => setReady(true)} onError={(e) => console.error(e)} />;
  }
};

export default App;
