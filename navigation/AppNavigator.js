import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AuthScreen, SignUpScreen, SignInScreen, StartScreen } from '../screens';
import tabNavigator from './MainTabNavigator';
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthScreen,
    Start: StartScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    Main: tabNavigator
    //Auth: AuthStack,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  }),
  {
    initialRouteName: 'Auth'
  }
);
