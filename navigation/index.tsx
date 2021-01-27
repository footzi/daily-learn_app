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
  DictionariesListScreen,
  PreviewDictionaryScreen,
  ProfileScreen,
} from '../screens';
import { DictionaryStackParamList } from './interfaces';
import { SCREENS, LOADING_ITEMS, Colors } from '@constants';
import { BarIcon, Loader } from '@components';
import { loadingData } from '@store';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator<DictionaryStackParamList>();
const DictionaryStack = createStackNavigator();

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

const cardStyle = { backgroundColor: Colors.white, paddingBottom: 50 };

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
        component={DictionariesListScreen}
        options={{ ...headerOptionsMain, headerTitle: 'Словари:' }}
      />
      <DictionaryStack.Screen
        name={SCREENS.PREVIEW_DICTIONARY}
        component={PreviewDictionaryScreen}
        options={{ ...headerOptionsInner }}
      />
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
});

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={setBarOptions}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: false,
        style: {
          borderTopWidth: 0,
          height: 50,
          position: 'absolute',
          backgroundColor: Colors.secondary,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
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
            <AppStack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} options={{ headerShown: false }} />
            <AppStack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
