import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '@constants';

export const ProgressBar = ({ progress = 0, onEndAnimation = () => {} }) => {
  const [value] = useState(new Animated.Value(progress));

  const onAnimEndCallback = () => {
    if (progress) {
      onEndAnimation();
    }
  };

  useEffect(() => {
    Animated.timing(value, {
      toValue: progress,
      duration: 200,
    }).start(onAnimEndCallback);
  }, [progress]);

  const width = value.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View>
      <Rail>
        <Animated.View
          style={{
            width,
            height: 3,
            backgroundColor: `${(progress < 50 && Colors.warning) || (progress >= 50 && Colors.success)}`,
          }}
        />
      </Rail>
    </View>
  );
};

const View = styled.View`
  flex: 1;
`;

const Rail = styled.View`
  border-radius: 4px;
  height: 3px;
  overflow: hidden;
  background-color: ${Colors.gray};
`;
