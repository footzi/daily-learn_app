import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, NOTIFICATION_AUTO_CLOSE_TIMEOUT, NOTIFICATION_TYPES } from '@constants';
import { AnimationUnMountable } from '../Animation-UnMountable';
import { AppContext, clearNotification } from '../../store/new-store';

let timeout = null;

export const Notification: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { notification } = state;

  const onPress = () => {
    dispatch(clearNotification());
    clearTimeout(timeout);
  };

  useEffect(() => {
    if (notification.text) {
      timeout = setTimeout(() => {
        dispatch(clearNotification());
      }, NOTIFICATION_AUTO_CLOSE_TIMEOUT);
    }

    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <AnimationUnMountable
      isMounted={Boolean(notification.text)}
      animation="fadeIn"
      umountAnimation="fadeOut"
      style={{ position: 'absolute', top: 50, right: 0, width: '100%' }}>
      <Container>
        <Toast>
          <Title>{notification.text}</Title>
          <TouchableWithoutFeedback onPress={onPress}>
            <Text>Okay</Text>
          </TouchableWithoutFeedback>
        </Toast>
      </Container>
    </AnimationUnMountable>
  );
};

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

const Toast = styled.View`
  background-color: ${Colors.coal};
  flex-direction: row;
  padding: 10px;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.Text`
  font-family: 'Museo';
  font-size: 17px;
  color: ${Colors.white};
`;

const Title = styled(Text)`
  width: 80%;
  font-size: 15px;
`;
