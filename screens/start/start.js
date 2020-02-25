import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '@components';
import * as commonEffects from '@store/common-effects';

export const StartScreen = ({ navigation }) => {
  const state = useSelector(state => state);
  const { data } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonEffects.getMainData({ navigation }));
  }, []);

  useEffect(() => {
    if (data) {
      navigation.navigate('Main');
    }
  }, [data]);

  return <Loader />;
};
