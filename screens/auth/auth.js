import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '@components';
import * as effects from './effects';

export const AuthScreen = ({ navigation }) => {
  const state = useSelector(state => state);
  const { auth } = state;
  const dispatch = useDispatch();

  const onCheckAuth = () => dispatch(effects.checkInitAuth());

  useEffect(() => {
    onCheckAuth();
  }, []);

  useEffect(() => {
    if (auth) {
      navigation.navigate('Start');
    }

    if (!auth && auth !== '') {
      navigation.navigate('SignIn');
    }
  }, [auth]);

  return <Loader />;
};
