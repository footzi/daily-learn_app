import React, { useCallback, useState } from "react";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from './screens';

const App: React.FC = () => {
  const [isReady, setReady] = useState<boolean>(false);

  const setInitialData = useCallback(async () => {
    await Font.loadAsync({
      Museo: require('./assets/fonts/MuseoSansCyrl-500.ttf'),
      Museo300Italic: require('./assets/fonts/MuseoSansCyrl-300Italic.ttf'),
      ...Ionicons.font,
    });
  }, []);

  const onFinish = useCallback(() => setReady(true), []);

  // @todo Понять в какие-моменты это работает и как можно обработать
  const onError = useCallback((error) => console.error(error), []);

  if (isReady) {
    return (
      <Root />
    );
  }

  if (!isReady) {
    return <AppLoading startAsync={setInitialData} onFinish={onFinish} onError={onError} />;
  }
};

export default App;
