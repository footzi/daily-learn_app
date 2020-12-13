import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableWithoutFeedback, Keyboard, Platform, Animated, ViewPropTypes } from 'react-native';
import { NewColors as Colors, NOTIFICATION_AUTO_CLOSE_TIMEOUT, NOTIFICATION_TYPES } from '@constants';
import { AnimationUnmountable } from '../AnimationUnmountable';
import { setNotification, InitStateInterface } from '@store';
import { NotificationState } from './interfaces';

export const NewNofification: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [{ text }, setState] = useState<NotificationState>({ type: NOTIFICATION_TYPES.ERROR, text: '' });
  const { notification } = useSelector((state: InitStateInterface) => state);

  let timeout = null;

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

  const onPress = () => {
    console.log('hello');
  };

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
    <AnimationUnmountable isMounted={isShow} animation="fadeIn" unmountAnimation="fadeOut">
      <Container>
        <Toast>
          <Title>{text}</Title>
          <TouchableWithoutFeedback onPress={onPress}>
            <Text>Okay</Text>
          </TouchableWithoutFeedback>
        </Toast>
      </Container>
    </AnimationUnmountable>
  );
};

const Container = styled.View`
  position: absolute;
  top: 50px;
  right: 0;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const Toast = styled.View`
  background-color: ${Colors.coal};
  /* elevation: 9; */
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
