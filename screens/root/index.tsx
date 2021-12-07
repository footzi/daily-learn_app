import React, { useContext, useEffect, useReducer } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, Main } from '@navigation';
import { Loader, Notification } from '@components';
import { SCREENS } from '@constants';

import { useGetCurrentUser } from './hooks/useGetCurrentUser';
import { useLogin } from '../../api/hooks/useLogin';
import { reducer, initialState, AppContext, State, Dispatch } from '../../store/new-store';
import { useGetMainData } from '../../api/hooks/useGetMainData';

import { SignInScreen } from '../signin';
import { SignUpScreen } from '../signup';
// export interface UserContextIn {
//
// }

export const Root: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // useGetMainData();
  // const user = useGetCurrentUser();

  // useLogin();
  // const state = useSelector((state) => state);
  // const { isAuth, loading } = state;
  // const isFirstLoading = loading[LOADING_ITEMS.FIRST];
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(loadingData());
  //   }
  // }, [isAuth]);
  //
  // if (isAuth && isFirstLoading) {
  //   return <Loader />;
  // }

  useEffect(() => {
    // useGetCurrentUser();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Inner />
    </AppContext.Provider>

    // <Notification />

    // <NavigationContainer>
    //   <AppStack.Navigator>
    //     {isAuth && <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />}
    //
    //     {!isAuth && (
    //       <>
    //         <AppStack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} options={{ headerShown: false }} />
    //         <AppStack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} options={{ headerShown: false }} />
    //       </>
    //     )}
    //   </AppStack.Navigator>
    // </NavigationContainer>
  );
};

export const Inner = () => {
  // useLogin();

  return <Test />;
};

const Test = () => {
  const { loading } = useGetMainData();
  const { state } = useContext(AppContext);
  const { user } = state;

  console.log(user);

  if (loading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {/*{user && <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />}*/}

        {!user && (
          <>
            <AppStack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} options={{ headerShown: false }} />
            {/*<AppStack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} options={{ headerShown: false }} />*/}
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
