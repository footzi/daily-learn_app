import React from 'react';
import { View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { ButtonIconProps } from './interfaces';

export const ButtonIcon: React.FC<ButtonIconProps> = ({ children, style, ...rest }) => (
  <View style={style}>
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  </View>
);
