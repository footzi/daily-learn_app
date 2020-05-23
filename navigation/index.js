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
  SettingsScreen,
} from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import * as commonEffects from '@store/common-effects';
import { Loader } from '@components';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const DictionaryStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="DictionaryTraining"
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
      <DictionaryStack.Screen name="Dictionary" component={DictionariesScreen} options={{ headerShown: false }} />
      <DictionaryStack.Screen name="PreviewDictionary" component={PreviewDictionaryScreen} />
      <DictionaryStack.Screen name="SettingsDictionary" component={SettingsDictionaryScreen} />
    </DictionaryStack.Navigator>
  );
};

const setBarOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = Platform.OS === 'ios' ? 'ios-school' : 'md-school';
    } else if (route.name === 'DictionariesScreen') {
      iconName = Platform.OS === 'ios' ? 'ios-book' : 'md-book';
    } else if (route.name === 'Settings') {
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
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="DictionariesScreen" component={DictionaryStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
