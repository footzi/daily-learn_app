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
import { SCREENS, LOADING_ITEMS, NewColors as Colors } from '@constants';
import { BarIcon, Loader } from '@components';
import { loadingData } from '@store/common-effects';

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
      iconName = Platform.OS === 'ios' ? 'ios-person' : 'md-person';
    }

    return <BarIcon focused={focused} name={iconName} />;
  },
});

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={setBarOptions}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: false,
        style: {
          backgroundColor: Colors.secondary,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      }}>
      <Tab.Screen name={SCREENS.HOME} component={HomeStackScreen} />
      <Tab.Screen name={SCREENS.DICTIONARIES} component={DictionaryStackScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const state = useSelector((state) => state);
  const { isAuth, loading } = state;
  const isFirstLoading = loading[LOADING_ITEMS.FIRST];
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(loadingData());
    }
  }, [isAuth]);

  if (isAuth && isFirstLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {isAuth && <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />}

        {!isAuth && (
          <>
            <AppStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <AppStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
