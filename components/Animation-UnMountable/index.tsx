import React, { useState, useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { AnimationUnMountableProps } from './interfaces';

export const AnimationUnMountable: React.FC<AnimationUnMountableProps> = ({
  isMounted,
  animation,
  duration = 300,
  umountAnimation,
  umountDuration = 300,
  children,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const container = useRef(null);

  const mount = () => {
    setIsVisible(true);
  };

  const umount = () => {
    if (!container?.current) {
      return;
    }

    container.current[umountAnimation](umountDuration).then(() => {
      if (isVisible) {
        setIsVisible(false);
      }
    });
  };

  useEffect(() => {
    if (isMounted) {
      mount();
    } else {
      umount();
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
