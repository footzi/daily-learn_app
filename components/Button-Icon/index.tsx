import React from 'react';
import { View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';

type Props = {
  style: StyleProp;
  onPress: () => void;
};

type StyleProp = {
  marginTop?: number;
};

export const ButtonIcon: React.FC<Props> = ({ children, onPress, style = {} }) => {
  return (
    <View style={style}>
      <TouchableNativeFeedback onPress={onPress}>{children}</TouchableNativeFeedback>
    </View>
  );
};
