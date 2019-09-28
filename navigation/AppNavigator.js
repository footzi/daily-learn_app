import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import tabNavigator from './MainTabNavigator';
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    Main: tabNavigator
    //Auth: AuthStack,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  }),
  {
    initialRouteName: 'SignIn'
  }
);
