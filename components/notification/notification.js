import React from 'react';
import { Toast, View } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  notification: state.notification
});

const Notification = ({notification}) => {
  console.log(notification)
  if (notification.text) {
    Toast.show({
      text: 'Wrong password!',
      buttonText: 'Okay'
    })}
  }

  return (<View />);
};


export default connect(
  mapStateToProps,
)(Notification);