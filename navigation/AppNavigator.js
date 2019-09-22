import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import MainTabNavigator from './MainTabNavigator';

// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    SignIn: SignInScreen,
    //Auth: AuthStack,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
  }),
  {
    initialRouteName: 'SignIn',
  }
);
