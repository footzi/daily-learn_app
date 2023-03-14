import React, { useEffect } from 'react';
import { Platform, Text } from 'react-native';
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
import { SCREENS_TITLE } from '../constants';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const DictionaryStack = createStackNavigator();

// options={{ headerShown: false }}

const headerOptionsMain = {
  headerStyle: { height: 90, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1 },
  headerTitleStyle: {
    fontFamily: 'RobotoBold',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 32,
    color: Colors.grey,
  },
};

const headerOptionsInner = {
  ...headerOptionsMain,
  headerTitleStyle: { ...headerOptionsMain.headerTitleStyle, paddingLeft: 0 },
  // headerPressColorAndroid: Colors.primary,
};
//
const cardStyle = { backgroundColor: Colors.white };

// export const getHeaderTitle = (route) => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
//
//   console.log(routeName);
//
//   return 'hello';
// };

// Главная с тренировками
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ cardStyle }}>
      <HomeStack.Screen
        name={SCREENS.HOME_MAIN}
        component={HomeScreen}
        options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.HOME] }}
      />
      <HomeStack.Screen
        name={SCREENS.HOME_TRAINING}
        component={DictionaryTrainingScreen}
        options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.HOME] }}
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
        options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.DICTIONARIES] }}
      />
      <DictionaryStack.Screen
        name={SCREENS.PREVIEW_DICTIONARY}
        component={PreviewDictionaryScreen}
        options={{ ...headerOptionsInner, title: SCREENS_TITLE[SCREENS.DICTIONARIES] }}
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
        options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.PROFILE] }}
      />
    </DictionaryStack.Navigator>
  );
};

const setBarOptions = ({ route, color, size }) => ({
  tabBarShowLabel: false,
  tabBarIcon: ({ focused }) => {
    let iconName;

    if (route.name === SCREENS.HOME) {
      iconName = Platform.OS === 'ios' ? 'ios-school' : 'md-school';
    } else if (route.name === SCREENS.DICTIONARIES) {
      iconName = Platform.OS === 'ios' ? 'ios-book' : 'md-book';
    } else if (route.name === SCREENS.PROFILE) {
      iconName = Platform.OS === 'ios' ? 'ios-person' : 'md-person';
    }

    return <BarIcon focused={focused} name={iconName} color={color} size={size} />;
  },
});

const Main = () => {
  return (
    <Tab.Navigator screenOptions={setBarOptions}>
      <Tab.Screen
        name={SCREENS.HOME}
        options={{ headerShown: false }}
        // options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.HOME] }}
        component={HomeStackScreen}
      />
      {/*<Tab.Screen name={SCREENS.DICTIONARIES} component={DictionaryStackScreen} />*/}
      <Tab.Screen
        name={SCREENS.DICTIONARIES}
        component={DictionaryStackScreen}
        options={{ headerShown: false }}
        // options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.DICTIONARIES] }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        options={{ headerShown: false }}
        // options={{ ...headerOptionsMain, title: SCREENS_TITLE[SCREENS.PROFILE] }}
        component={ProfileStackScreen}
      />
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
