import React, { useContext, useEffect, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, Main } from '@navigation';
import { Loader, Notification } from '@components';
import { SCREENS } from '@constants';

import { reducer, initialState, AppContext, ACTIONS } from '../../store/new-store';
import { useGetMainData } from '@api';

import { SignInScreen } from '../signin';
import { SignUpScreen } from '../signup';

export const Root: React.FC = () => {
  const { isLoading } = useGetMainData();
  const { state } = useContext(AppContext);
  const { user, dictionaries } = state;

  if (isLoading && !user) {
    return <Loader />;
  }

  return (
    <>
      <NavigationContainer>
        <AppStack.Navigator>
          {user && <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />}

          {!user && (
            <>
              <AppStack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} options={{ headerShown: false }} />
              <AppStack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} options={{ headerShown: false }} />
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
      <Notification />
    </>
  );
};

// export const Container: React.FC = ({ data, isLoading }) => {
//   // const { isLoading, refetch } = useGetMainData();
//   // const { user, dictionaries } = data;
//   const { state, dispatch } = useContext(AppContext);
//
//   console.log(state, 'csl');
//
//   if (isLoading) {
//     return <Loader />;
//   }
//
//   // useEffect(() => {
//   //   if (user) {
//   //     dispatch({
//   //       type: ACTIONS.SET_USER,
//   //       payload: user,
//   //     });
//   //   }
//   //
//   //   if (dictionaries) {
//   //     dispatch({
//   //       type: ACTIONS.SET_DICTIONARIES,
//   //       payload: dictionaries,
//   //     });
//   //   }
//   // }, [data]);
//
//   return (
//     // <>
//     //   <NavigationContainer>
//     //     <AppStack.Navigator>
//     //       {state.user && <AppStack.Screen name="Main" component={Main} options={{ headerShown: false }} />}
//     //
//     //       {!state.user && (
//     //         <>
//     //           <AppStack.Screen name={SCREENS.SIGN_IN} component={SignInScreen} options={{ headerShown: false }} />
//     //           {/*<AppStack.Screen name={SCREENS.SIGN_UP} component={SignUpScreen} options={{ headerShown: false }} />*/}
//     //         </>
//     //       )}
//     //     </AppStack.Navigator>
//     //   </NavigationContainer>
//     //   <Notification />
//     // </>
//   );
// };
