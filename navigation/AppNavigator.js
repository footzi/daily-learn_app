import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';

// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator({
    SignUp: SignUpScreen
    //Auth: AuthStack,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
  }),
  {
    initialRouteName: 'SignUp'
  }
);
