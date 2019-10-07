import React, { useEffect } from 'react';
import { Toast, View } from 'native-base';
import { connect } from 'react-redux';
import { ERROR, SUCCESS } from '../../store/constans';
import * as effects from './effects';

const types = {
  [ERROR]: 'danger',
  [SUCCESS]: 'success'
};

const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = {
  clearNotification: effects.clearNotification
};

const Notification = ({ notification, clearNotification }) => {
  const onClose = () => {
    clearNotification();
  };

  useEffect(() => {
    const { text, type } = notification;

    if (text && type) {
      Toast.show({
        text,
        type: types[type],
        buttonText: 'Okay',
        position: 'top',
        duration: 10000,
        onClose: onClose
      });
    }
  }, [notification]);

  return <View />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
