import React, { useState, useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { AnimationUnmountableProps } from './interfaces';

export const AnimationUnmountable: React.FC<AnimationUnmountableProps> = ({
  isMounted,
  animation,
  duration = 300,
  unmountAnimation,
  unmountDuration = 300,
  children,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const container = useRef(null);

  const mount = () => {
    setIsVisible(true);
  };

  const unmount = () => {
    if (!container?.current) {
      return;
    }

    container.current[unmountAnimation](unmountDuration).then(() => {
      if (isVisible) {
        setIsVisible(false);
      }
    });
  };

  useEffect(() => {
    if (isMounted) {
      mount();
    } else {
      unmount();
    }
  }, [isMounted]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animatable.View
      ref={container}
      animation={animation}
      duration={duration}
      easing="ease-in-out"
      useNativeDriver
      {...rest}>
      {children}
    </Animatable.View>
  );
};
