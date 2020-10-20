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

// options={{ headerShown: false }}

const headerOptionsMain = {
  headerStyle: { backgroundColor: Colors.secondary, borderBottomRightRadius: 25, borderBottomLeftRadius: 25 },
  headerTintColor: Colors.primary,
  headerTitleStyle: { fontFamily: 'Museo', fontSize: 20, textAlign: 'center' },
};

const headerOptionsInner = {
  ...headerOptionsMain,
  headerTitleStyle: { ...headerOptionsMain.headerTitleStyle, textAlign: 'left' },
  headerPressColorAndroid: Colors.primary,
  headerTitleContainerStyle: { left: 50 },
};

const cardStyle = { backgroundColor: Colors.white };

// Главная с тренировками
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ cardStyle }}>
      <HomeStack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{ ...headerOptionsMain, headerTitle: 'Выберите словарь:' }}
      />
      <HomeStack.Screen
        name={SCREENS.DICTIONARY_TRAINING}
        component={DictionaryTrainingScreen}
        options={{
          ...headerOptionsInner,
          headerTitle: 'Тренировка',
        }}
      />
    </HomeStack.Navigator>
  );
};

// Словари
const DictionaryStackScreen = () => {
  return (
    <DictionaryStack.Navigator screenOptions={{ cardStyle }}>
      <DictionaryStack.Screen
        name={SCREENS.DICTIONARIES_LIST}
        component={DictionariesScreen}
        options={{ ...headerOptionsMain, headerTitle: 'Словари:' }}
      />
      <DictionaryStack.Screen
        name={SCREENS.PREVIEW_DICTIONARY}
        component={PreviewDictionaryScreen}
        options={{ ...headerOptionsInner }}
      />
      <DictionaryStack.Screen name={SCREENS.SETTINGS_DICTIONARY} component={SettingsDictionaryScreen} />
    </DictionaryStack.Navigator>
  );
};

// Профиль
const ProfileStackScreen = () => {
  return (
    <DictionaryStack.Navigator screenOptions={{ cardStyle }}>
      <DictionaryStack.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{ ...headerOptionsMain, headerTitle: 'Профиль:' }}
      />
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
  // style: {
  //   backgroundColor: Colors.secondary,
  // }
});

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={setBarOptions}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: false,
        style: {
          // backgroundColor: 'transparent',
          // position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: Colors.secondary,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          // overflow: 'hidden',
        },
      }}>
      <Tab.Screen name={SCREENS.HOME} component={HomeStackScreen} />
      <Tab.Screen name={SCREENS.DICTIONARIES} component={DictionaryStackScreen} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileStackScreen} />
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
