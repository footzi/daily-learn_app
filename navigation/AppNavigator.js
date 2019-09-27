import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    SignIn: SignInScreen
    //Auth: AuthStack,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
  }),
  {
    initialRouteName: 'SignIn'
  }
);
