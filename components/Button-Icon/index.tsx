import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <TouchableOpacity onPressIn={onPress}>{children}</TouchableOpacity>
    </View>
  );
};
