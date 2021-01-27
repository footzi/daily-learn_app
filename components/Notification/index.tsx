import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Notification as NotificationState } from '@interfaces';
import { useSelector } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, NOTIFICATION_AUTO_CLOSE_TIMEOUT, NOTIFICATION_TYPES } from '@constants';
import { setNotification, InitStateInterface } from '@store';
import { AnimationUnMountable } from '../Animation-UnMountable';

let timeout = null;

export const Notification: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [{ text }, setState] = useState<NotificationState>({ type: NOTIFICATION_TYPES.ERROR, text: '' });
  const { notification } = useSelector((state: InitStateInterface) => state);

  const show = () => {
    setIsShow(true);

    timeout = setTimeout(() => {
      hide();
    }, NOTIFICATION_AUTO_CLOSE_TIMEOUT);
  };

  const hide = () => {
    setIsShow(false);
    setNotification({ type: null, text: '' });
    clearTimeout(timeout);
  };

  const onPress = () => hide();

  useEffect(() => {
    const isShow = !!notification?.text;

    if (isShow) {
      const { text, type } = notification;

      setState({ text, type });
      show();
    } else {
      hide();
    }

    return () => clearTimeout(timeout);
  }, [notification]);

  return (
    <AnimationUnMountable
      isMounted={isShow}
      animation="fadeIn"
      umountAnimation="fadeOut"
      style={{ position: 'absolute', top: 50, right: 0, width: '100%' }}>
      <Container>
        <Toast>
          <Title>{text}</Title>
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
