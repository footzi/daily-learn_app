import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

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
      <TouchableWithoutFeedback onPress={onPress}>{children}</TouchableWithoutFeedback>
    </View>
  );
};
