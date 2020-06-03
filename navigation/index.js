import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SignUpScreen,
  SignInScreen,
  HomeScreen,
  DictionaryTrainingScreen,
  DictionariesScreen,
  PreviewDictionaryScreen,
  SettingsDictionaryScreen,
  ProfileScreen,
} from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import { SCREENS } from '@constants';
import { Loader } from '@components';
import * as commonEffects from '@store/common-effects';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const DictionaryStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={SCREENS.HOME} component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name={SCREENS.DICTIONARY_TRAINING}
        component={DictionaryTrainingScreen}
        options={{
          headerTitle: 'Тренировка',
        }}
      />
    </HomeStack.Navigator>
  );
};

const DictionaryStackScreen = () => {
  return (
    <DictionaryStack.Navigator>
      <DictionaryStack.Screen
        name={SCREENS.DICTIONARIES_LIST}
        component={DictionariesScreen}
        options={{ headerShown: false }}
      />
      <DictionaryStack.Screen name={SCREENS.PREVIEW_DICTIONARY} component={PreviewDictionaryScreen} />
      <DictionaryStack.Screen name={SCREENS.SETTINGS_DICTIONARY} component={SettingsDictionaryScreen} />
    </DictionaryStack.Navigator>
  );
};

const setBarOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName;

    if (route.name === SCREENS.HOME) {
      iconName = Platform.OS === 'ios' ? 'ios-school' : 'md-school';
    } else if (route.name === SCREENS.DICTIONARIES) {
      iconName = Platform.OS === 'ios' ? 'ios-book' : 'md-book';
    } else if (route.name === SCREENS.PROFILE) {
      iconName = Platform.OS === 'ios' ? 'ios-options' : 'md-options';
    }

    return <TabBarIcon focused={focused} name={iconName} />;
  },
});

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={setBarOptions}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: false,
      }}>
      <Tab.Screen name={SCREENS.HOME} component={HomeStackScreen} />
      <Tab.Screen name={SCREENS.DICTIONARIES} component={DictionaryStackScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const state = useSelector((state) => state);
  const { isAuth, data } = state;
  const isData = Object.keys(data).length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(commonEffects.getMainData());
    }
  }, [isAuth]);

  // показываем только тогда идет запрос за данными
  // isAuth && !isData
  if (isAuth && !isData) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {!isAuth && (
          <>
            <AppStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <AppStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}

        {isAuth && isData && <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
