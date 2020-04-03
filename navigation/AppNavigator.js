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
  SettingsScreen
} from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import * as commonEffects from '@store/common-effects';
import { Loader } from '@components';

//import { DictionariesScreen } from '../screens/dictionaries';

// import tabNavigator from './MainTabNavigator';
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// export default createAppContainer(
//   createSwitchNavigator({
//     Auth: AuthScreen,
//     Start: StartScreen,
//     SignIn: SignInScreen,
//     SignUp: SignUpScreen,
//     Main: tabNavigator
//     //Auth: AuthStack,
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   }),
//   {
//     initialRouteName: 'Auth'
//   }
// );

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
          headerTitle: 'Тренировка'
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
  }
});

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={setBarOptions}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: false
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="DictionariesScreen" component={DictionaryStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const state = useSelector(state => state);
  const { auth } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonEffects.checkInitAuth());
  }, []);

  if (auth === null) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {auth ? (
          <>
            <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <AppStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <AppStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
