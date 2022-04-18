import { Loader, Notification } from '@components';
import { SCREENS } from '@constants';
import { AppStack, Main } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useAppContext } from '@store';
import React from 'react';

import { useGetMainData } from '../../hooks';
import { SignInScreen } from '../signin';
import { SignUpScreen } from '../signup';

export const Root: React.FC = () => {
  const { isLoading } = useGetMainData();
  const { state } = useAppContext();
  const { user } = state;

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
