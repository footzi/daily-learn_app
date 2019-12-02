import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import Colors from '@constants/Colors';

export const ProgressBar = ({ progress }) => {
  const [value] = useState(new Animated.Value(progress));

  useEffect(() => {
    Animated.timing(value, {
      toValue: progress,
      duration: 200
    }).start();
  }, [progress]);

  const width = value.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View>
      <Rail>
        <Animated.View
          style={{
            width: width,
            height: 10,
            backgroundColor: `${(progress < 50 && Colors.warning) || (progress >= 50 && Colors.success)}`
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
  height: 10px;
  overflow: hidden;
  background-color: ${Colors.gray};
`;
