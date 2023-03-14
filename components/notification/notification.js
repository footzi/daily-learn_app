import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, SUCCESS } from '@constants';
import * as effects from './effects';
import { View } from 'react-native';

const types = {
  [ERROR]: 'danger',
  [SUCCESS]: 'success',
};

export const Notification = () => {
  const { notification } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onClose = () => dispatch(effects.clearNotification);

  useEffect(() => {
    const { text, type } = notification;

    if (text && type) {
      Toast.show({
        text,
        type: types[type],
        position: 'top',
        onClose,
      });
    }
  }, [notification]);

  return <View />;
};
