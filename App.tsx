import { Ionicons } from '@expo/vector-icons';
import { AppContext, initialState, reducer } from '@store';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useCallback, useReducer, useState } from 'react';

import { Root } from './screens';

const App: React.FC = () => {
  const [isReady, setReady] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInitialData = useCallback(async () => {
    await Font.loadAsync({
      Museo: require('./assets/fonts/MuseoSansCyrl-300.ttf'),
      Museo300Italic: require('./assets/fonts/MuseoSansCyrl-300Italic.ttf'),
      ...Ionicons.font,
    });
  }, []);

  const onFinish = useCallback(() => setReady(true), []);

  // @todo Понять в какие-моменты это работает и как можно обработать
  const onError = useCallback((error) => console.error(error), []);

  if (isReady) {
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        <Root />
      </AppContext.Provider>
    );
  }

  return <AppLoading startAsync={setInitialData} onFinish={onFinish} onError={onError} />;
};

export default App;
