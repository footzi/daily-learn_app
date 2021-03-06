import React, { useEffect } from 'react';
import { Toast, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, SUCCESS } from '@constants';
import * as effects from './effects';

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
        buttonText: 'Okay',
        position: 'top',
        duration: 10000,
        onClose,
      });
    }
  }, [notification]);

  return <View />;
};
