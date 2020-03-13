// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as React from 'react';
import { AuthScreen, SignUpScreen, SignInScreen, StartScreen } from '../screens';
import HomeScreen from '../screens/home';
import { DictionaryTrainingScreen } from '../screens/training';

import { DictionariesScreen } from '../screens/dictionaries';
import CreateDictionaryScreen from '../screens/dictionaries/sub/create';
import { PreviewDictionaryScreen } from '../screens/dictionaries/sub/preview';
import SettingsDictionaryScreen from '../screens/dictionaries/sub/settings';

//import { DictionariesScreen } from '../screens/dictionaries';

import { createStackNavigator } from '@react-navigation/stack';
// import tabNavigator from './MainTabNavigator';
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/settings';
import TabBarIcon from '../components/TabBarIcon';
import { Platform } from 'react-native';

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

const HomeStack = createStackNavigator();
const DictionaryStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="DictionaryTraining"
        component={DictionaryTrainingScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const DictionaryStackScreen = () => {
  return (
    <DictionaryStack.Navigator>
      <DictionaryStack.Screen name="Dictionary" component={DictionariesScreen} />
      <DictionaryStack.Screen name="CreateDictionary" component={CreateDictionaryScreen} />
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
        showLabel: false
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="DictionariesScreen" component={DictionaryStackScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const TStack = createStackNavigator();

// const getAuth = async () => {
//   const isAuth = await LocalStorage.has(TOKENS_LS);
//   const user = await LocalStorage.get(USER_LS);
//
//   return isAuth
// }

const isAuth = true;

export const Navigation = () => (
  <NavigationContainer>
    <TStack.Navigator>
      {isAuth ? (
        <>
          <TStack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <TStack.Screen name="SignIn" component={SignInScreen} />
          <TStack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </TStack.Navigator>
  </NavigationContainer>
);
