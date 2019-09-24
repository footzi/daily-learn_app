import React, { useEffect } from 'react';
import { Toast, View } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  notification: state.notification
});


const Notification = ({notification}) => {
  useEffect(() => {
    const { text, type } = notification;

    if (text && type) {
      Toast.show({
        text,
        type: type === "SUCCESS" ? 'success' : 'danger',
        buttonText: "Okay",
        position: 'top',
        duration: 2000
      })
    }
    
  }, [notification])

  return <View />
}

export default connect(
  mapStateToProps,
)(Notification);