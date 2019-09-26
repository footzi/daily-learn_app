import React, { useEffect } from 'react';
import { Toast, View } from 'native-base';
import { connect } from 'react-redux';
import { setNotification } from '../../store';

const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setNotification: () => dispatch(setNotification({ type: null, text: '' }))
});

const Notification = ({ notification, setNotification }) => {
  const onClose = () => {
    setNotification();
  };

  useEffect(() => {
    const { text, type } = notification;

    if (text && type) {
      Toast.show({
        text,
        type: type === 'SUCCESS' ? 'success' : 'danger',
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
